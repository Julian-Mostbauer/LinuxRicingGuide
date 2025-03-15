const aivailableProviders = ['mdi', 'fa6-solid']

let activeProvider = aivailableProviders[0]
const iconToLink = (name: string, provider?: string) =>
    provider ? provider : activeProvider + ':' + name

export { iconToLink }
