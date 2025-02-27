const files = [
    'configurator.html',
    'desktop-environments.html',
    'distros.html',
    'index.html',
    'package-managers.html',
    'personal-setups.html',
    'shells.html',
    'terminals.html',
    'terminal-themes.html',
    'window-managers.html',
    'distros-history/alpine-linux-history.html',
    'distros-history/arch-history.html',
    'distros-history/artix-linux-history.html',
    'distros-history/black-arch-linux-history.html',
    'distros-history/cent-os-history.html',
    'distros-history/debian-history.html',
    'distros-history/elementary-os-history.html',
    'distros-history/endeavour-os-history.html',
    'distros-history/fedora-history.html',
    'distros-history/garuda-linux-history.html',
    'distros-history/gentoo-history.html',
    'distros-history/index.html',
    'distros-history/kali-linux-history.html',
    'distros-history/manjaro-history.html',
    'distros-history/mint-history.html',
    'distros-history/mx-linux-history.html',
    'distros-history/openSUSE-history.html',
    'distros-history/parrot-security-os-history.html',
    'distros-history/pop!-os-history.html',
    'distros-history/qubes-os-history.html',
    'distros-history/slackware-history.html',
    'distros-history/ubuntu-history.html',
    'distros-history/ubuntu-studio-history.html',
    'distros-history/void-linux-history.html',
]
files.map((file) => `/src/${file}`)

const CACHE_KEY = 'fileCache'
const CACHE_EXPIRATION_TIME = 5 * 60 * 1000 // 5 minutes in milliseconds

const fileCache = new Map(JSON.parse(localStorage.getItem(CACHE_KEY)) || [])

// Clean up expired entries on load
const currentTime = Date.now()

// eslint-disable-next-line no-unused-vars
for (const [file, { _, timestamp }] of fileCache) {
    if (currentTime - timestamp >= CACHE_EXPIRATION_TIME) {
        fileCache.delete(file)
    }
}

// Save the cache back to localStorage when updated
function saveCacheToLocalStorage() {
    localStorage.setItem(
        CACHE_KEY,
        JSON.stringify(Array.from(fileCache.entries()))
    )
}

// Fetch file content with caching
async function getFileContent(file) {
    const currentTime = Date.now()

    // Check if the file content is already cached and not expired
    if (fileCache.has(file)) {
        const { content, timestamp } = fileCache.get(file)
        if (currentTime - timestamp < CACHE_EXPIRATION_TIME) {
            return content
        }
        // Remove expired cache entry
        fileCache.delete(file)
    }

    // Fetch the file content
    const response = await fetch(file)
    if (!response.ok) {
        throw new Error(`Failed to fetch file: ${file}`)
    }
    const text = await response.text()

    // Store the content in the cache with a timestamp
    fileCache.set(file, { content: text, timestamp: Date.now() })
    saveCacheToLocalStorage() // Save the updated cache

    return text
}

async function searchDocuments(searchString, useRegex) {
    const fileContents = await Promise.all(
        files.map(async (file) => {
            const text = await getFileContent(file)
            return { file, text }
        })
    )

    const regex = useRegex ? new RegExp(searchString, 'i') : null

    return fileContents.flatMap(({ file, text }) =>
        text
            .split('\n')
            .filter((line) =>
                useRegex ? regex.test(line) : line.includes(searchString)
            )
            .map((line) => ({ file: file, content: line }))
    )
}

export default searchDocuments
