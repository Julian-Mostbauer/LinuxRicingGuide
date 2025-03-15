const aivailableProviders = ['mdi', 'fa6-solid']

let activeProvider = aivailableProviders[1]

const iconToLink = (
    name: string,
    provider?: string,
    providerSpecificNames?: { provider: string; name: string }[]
) => {
    const specificName = providerSpecificNames?.find(
        (entry) => entry.provider === provider
    )?.name

    const finalName = specificName || (name.trim() ? name : 'error')
    const finalProvider =
        provider?.trim() && aivailableProviders.includes(provider)
            ? provider
            : activeProvider

    return `${finalProvider}:${finalName}`
}

export { iconToLink }
