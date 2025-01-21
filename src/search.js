async function getFiles() {
    try {
        const response = await fetch('./files.json');
        const data = await response.json();
        return data['files'];
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

async function getFileContent(file) {
    const response = await fetch(file);
    if (!response.ok) {
        throw new Error(`Failed to fetch file: ${file}`);
    }
    return await response.text();
}

async function searchDocuments(searchString) {
    const files = await getFiles();

    // Use Promise.all to fetch all file contents concurrently
    const fileContents = await Promise.all(
        files.map(async (file) => ({
            file,
            text: await getFileContent(file),
        }))
    );

    // Process the file contents to search for the string
    const results = fileContents.flatMap(({ file, text }) => {
        const lines = text.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.includes(searchString)) {
                return [
                    {
                        file,
                        line: i,
                        content: line,
                    },
                ];
            }
        }
        return [];
    });

    return results;
}

export default searchDocuments;
