const aivailableProviders = ['mdi', 'fa6-solid']

let activeProvider = aivailableProviders[1]

const iconToLink = (name: string, provider?: string) =>
    (provider?.trim() && aivailableProviders.includes(provider || '')
        ? provider
        : activeProvider) +
    ':' +
    (name.trim() ? name : 'error')

export { iconToLink }
