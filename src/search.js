async function getFiles() {
    try {
        const response = await fetch('./files.json')
        const data = await response.json()
        return data['files']
    } catch (error) {
        console.error('Error:', error)
        return []
    }
}

async function getFileContent(file) {
    const response = await fetch(file)
    if (!response.ok) {
        throw new Error('Failed to fetch file')
    }
    return await response.text()
}

async function searchDocuments(searchString) {
    const files = await getFiles()

    let results = []
    for (const file of files) {
        const text = await getFileContent(file)
        const lines = text.split('\n')

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]

            if (line.includes(searchString)) {
                const entry = {
                    file: file,
                    line: i,
                    content: line,
                }
                results.push(entry)
                break
            }
        }
    }

    return results
}

// Example usage:
searchDocuments('terminal').then((results) => {
    console.log('Files containing the search term:', results)
})
