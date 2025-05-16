function toHeaderCase(str: string) {
    if (str === void 0) str = ''
    if (!str) return ''

    return String(str)
        .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '')
        .replace(/([a-z])([A-Z])/g, function (m, a, b) {
            return a + '_' + b.toLowerCase()
        })
        .replace(/[^A-Za-z0-9]+|_+/g, ' ')
        .toLowerCase()
        .replace(/( ?)(\w+)( ?)/g, function (m, a, b, c) {
            return a + b.charAt(0).toUpperCase() + b.slice(1) + c
        })
}

function toBackendCase(str: string) {
    if (str === void 0) str = ''
    if (!str) return ''

    return String(str)
        .toLowerCase()
        .replace("-linux", "")
        .replace(" linux", "")
        .replace("-os", "")
        .replace("os", "")
        .trim()
        .split(" ").join('-')
        .replace(/[!_&]+$/, '');
        
}

export { toHeaderCase, toBackendCase }
