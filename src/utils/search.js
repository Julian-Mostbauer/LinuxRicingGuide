const files = [
    'shells.html',
    'index.html',
    'terminals.html',
    'configurator.html',
    'package-managers.html',
    'terminal-themes.html',
    'desktop-environments.html',
    'personal-setups.html',
    'window-managers.html',
    'distros.html',
]
files.map((file) => `/src/${file}`)

const CACHE_KEY = "fileCache"; // Key for storing cache in localStorage
const CACHE_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

// Load the cache from localStorage on initialization
const fileCache = new Map(JSON.parse(localStorage.getItem(CACHE_KEY)) || []);

// Clean up expired entries on load
const currentTime = Date.now();

// eslint-disable-next-line no-unused-vars
for (const [file, { _, timestamp }] of fileCache) {
    if (currentTime - timestamp >= CACHE_EXPIRATION_TIME) {
        fileCache.delete(file);
    }
}

// Save the cache back to localStorage when updated
function saveCacheToLocalStorage() {
    localStorage.setItem(
        CACHE_KEY,
        JSON.stringify(Array.from(fileCache.entries()))
    );
}

// Fetch file content with caching
async function getFileContent(file) {
    const currentTime = Date.now();

    // Check if the file content is already cached and not expired
    if (fileCache.has(file)) {
        const { content, timestamp } = fileCache.get(file);
        if (currentTime - timestamp < CACHE_EXPIRATION_TIME) {
            return content;
        }
        // Remove expired cache entry
        fileCache.delete(file);
    }

    // Fetch the file content
    const response = await fetch(file);
    if (!response.ok) {
        throw new Error(`Failed to fetch file: ${file}`);
    }
    const text = await response.text();

    // Store the content in the cache with a timestamp
    fileCache.set(file, { content: text, timestamp: Date.now() });
    saveCacheToLocalStorage(); // Save the updated cache

    return text;
}

async function searchDocuments(searchString) {
    const fileContents = await Promise.all(
        files.map((file) =>
            getFileContent(file).then((text) => ({ file, text }))
        )
    );

    const results = [];

    fileContents.forEach(({ file, text }) => {
        text.split('\n').forEach((line, i) => {
            if (line.includes(searchString)) {
                results.push({ file, line: i, content: line });
            }
        });
    });

    return results;
}

export default searchDocuments;
