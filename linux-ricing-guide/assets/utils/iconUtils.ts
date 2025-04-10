const availableProviders = ['mdi', 'fa6-solid']

let activeProvider: string = availableProviders[1]

const setActiveProvider = (p: string) =>
    (activeProvider =
        p.trim() && availableProviders.includes(p) ? p : activeProvider)

const iconToLink = (
    providerSpecificNames: Map<string, string>,
    alwaysUseProvider?: string
) => {
    if (!providerSpecificNames.has('default'))
        throw new Error('You have to provide a default option')

    const finalProvider: string = availableProviders.includes(
        alwaysUseProvider ?? ''
    )
        ? alwaysUseProvider ?? ''
        : activeProvider

    const finalName =
        (providerSpecificNames.has(finalProvider)
            ? providerSpecificNames.get(finalProvider)
            : providerSpecificNames.get('default')) || 'error'

    return `${finalProvider}:${finalName}`
}

export { iconToLink, setActiveProvider, activeProvider }
