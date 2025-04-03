import { H3Event } from 'h3'
import { resolve } from 'path'
import { readFile } from 'fs/promises'
import { parse } from '@vue/compiler-dom'
import {toHeaderCase} from "assets/utils/caseUtils";

export default defineEventHandler(async (event: H3Event) => {
  const query = getQuery(event).q?.toString()?.toLowerCase()
  
  if (!query || query.length < 2) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Search query must be at least 2 characters long'
    })
  }

  const pages = await getPageRoutes()
  const results = []

  
  for (const page of pages) {
    try {
      const content = await extractVueTextContent(page.filePath)
      if (content.toLowerCase().includes(query)) {
        results.push({
          path: page.routePath,
          title: toHeaderCase(page.routePath === "" ? "home" : page.routePath)
        })
      }
    } catch (error) {
      console.error(`Error processing ${page.routePath}:`, error)
    }
  }
  
  return {
    query,
    results
  }
})

interface PageInfo {
  routePath: string
  filePath: string
}

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

function extractPageTitle(content: string): string | null {
  const titleMatch = content.match(/<title>(.*?)<\/title>/i) || 
                    content.match(/<h1.*?>(.*?)<\/h1>/i) ||
                    content.match(/<h2.*?>(.*?)<\/h2>/i)
  return titleMatch ? titleMatch[1].trim() : null
}