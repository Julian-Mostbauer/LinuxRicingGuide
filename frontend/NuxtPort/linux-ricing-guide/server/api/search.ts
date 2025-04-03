import { H3Event } from 'h3'
import { resolve } from 'path'
import { readFile } from 'fs/promises'
import { parse } from '@vue/compiler-dom'
import { toHeaderCase } from 'assets/utils/caseUtils'
import { logger } from 'nuxt/kit'

interface PageInfo {
  routePath: string
  filePath: string
}

interface JsonContent {
  name: string
  searchableContent: string
}

export default defineEventHandler(async (event: H3Event) => {
  const query = getQuery(event).q?.toString()?.toLowerCase()
  
  if (!query || query.length < 2) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Search query must be at least 2 characters long'
    })
  }

  const [pages, histories] = await Promise.all([
    getPageRoutes(),
    getHistoryRoutes()
  ])

  const results = []

  // Process Vue pages
  for (const page of pages) {
    try {
      const content = await extractVueTextContent(page.filePath)
      if (content.toLowerCase().includes(query)) {
        results.push({
          path: page.routePath,
          title: toHeaderCase(page.routePath === '' ? 'home' : page.routePath)
        })
      }
    } catch (error) {
      console.error(`Error processing ${page.routePath}:`, error)
    }
  }

  // Process history JSON files
  for (const history of histories) {
    try {
      const { name, searchableContent } = await extractJsonContent(history.filePath)
      if (searchableContent.toLowerCase().includes(query)) {
        results.push({
          path: history.routePath.substring(1), // Remove leading slash for consistency
          title: `History of ${toHeaderCase(name)}`
        })
      }
    } catch (error) {
      console.error(`Error processing ${history.routePath}:`, error)
    }
  }
  
  return {
    query,
    results
  }
})

async function getPageRoutes(): Promise<PageInfo[]> {
  const pagesDir = resolve('./pages')
  const { globby } = await import('globby')
  const pageFiles = await globby([
    '**/*.vue',
    '!**/_*.vue',
    '!**/components/**',
  ], { cwd: pagesDir })

  return pageFiles.map(file => ({
    routePath: file
      .replace(/^\/?index\.vue$/, '')
      .replace(/\.vue$/, '')
      .replace(/\/index$/, '')
      .replace(/\[([^\]]+)\]/g, ':$1'),
    filePath: resolve(pagesDir, file)
  }))
}

async function getHistoryRoutes(): Promise<PageInfo[]> {
  const historiesDir = resolve('./server-data/histories')
  const { globby } = await import('globby')
  const historyFiles = await globby(['**/*.json'], { cwd: historiesDir })

  return historyFiles.map(file => ({
    routePath: `/distros/history/${file.replace(/\.json$/, '')}`,
    filePath: resolve(historiesDir, file)
  }))
}

async function extractVueTextContent(filePath: string): Promise<string> {
  const fileContent = await readFile(filePath, 'utf-8')
  const ast = parse(fileContent)
  
  let textContent = ''
  const extractText = (node: any) => {
    if (node.type === 2) { // Text node
      textContent += node.content + '\n'
    }
    if (node.children) {
      node.children.forEach(extractText)
    }
  }

  extractText(ast)
  return textContent
}

async function extractJsonContent(filePath: string): Promise<JsonContent> {
  const fileContent = await readFile(filePath, 'utf-8')
  const jsonData = JSON.parse(fileContent)
  
  let searchableContent = ''
  searchableContent += jsonData.name?.toString()?.toLowerCase() || ''
  searchableContent += ' '
  searchableContent += jsonData.description?.toString()?.toLowerCase() || ''
  
  if (jsonData.sections) {
    jsonData.sections.forEach((section: any) => {
      searchableContent += ' '
      searchableContent += section.text?.toString()?.toLowerCase() || ''
    })
  }

  return {
    name: jsonData.name || filePath.split('/').pop()?.replace('.json', '') || 'History',
    searchableContent: searchableContent
  }
}