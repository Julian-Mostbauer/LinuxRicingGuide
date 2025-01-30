const bootstrapFiles = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'
]

const loadStylesAndScripts = () => {
    const fontAwesomeScript = document.createElement('script')
    fontAwesomeScript.src = 'https://kit.fontawesome.com/0a7e2ccef9.js'
    fontAwesomeScript.crossOrigin = 'anonymous'
    document.head.appendChild(fontAwesomeScript)

    const bootstrapLink = document.createElement('link')
    bootstrapLink.href =
        'https://cdn.jsdelivr.net/npm' +
        '/bootstrap@5.3.3/dist/css/bootstrap.min.css'
    bootstrapLink.rel = 'stylesheet'
    bootstrapLink.crossOrigin = 'anonymous'
    document.head.appendChild(bootstrapLink)

    for (const file of bootstrapFiles) {
        const script = document.createElement('script')
        script.src = file
        script.crossOrigin = 'anonymous'
        document.head.appendChild(script)
    }
}

loadStylesAndScripts()
