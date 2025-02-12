const adeptLink = (icon) => {
    // if the site is being served locally for development, include the frontend path
    // on the server, only the frontend path is served used so we don't need to include it
    if (
        window.location.origin.includes('localhost') ||
        window.location.origin.includes('127.0.0.1')
    ) {
        icon = '/frontend' + icon
    }
    icon = window.location.origin + icon
    return icon
}

const addFaviconLinks = (icons, manifestPath) => {
    const createLink = ({ rel, sizes, href, type }) => {
        const link = document.createElement('link')
        link.rel = rel
        link.href = href // Use the href directly
        if (sizes) link.sizes = sizes
        if (type) link.type = type
        document.head.appendChild(link)
    }

    // Add each icon to the document head
    icons.forEach(({ rel, sizes, href, type }) => {
        createLink({ rel, sizes, href, type })
    })

    // Add the manifest link
    if (manifestPath) {
        createLink({ rel: 'manifest', href: manifestPath })
    }
}

// Load icons dynamically
document.addEventListener('DOMContentLoaded', () => {
    const manifestPath = adeptLink('/assets/favicon_io/site.webmanifest')

    fetch(manifestPath)
        .then((response) => response.json())
        .then((data) => {
            const icons = data.icons.map((icon) => ({
                rel: 'icon',
                sizes: icon.sizes,
                href: adeptLink(icon.src), // Correct the href construction
                type: icon.type,
            }))

            // Add additional icons not in the manifest
            icons.push(
                {
                    rel: 'apple-touch-icon',
                    href: adeptLink('/assets/favicon_io/apple-touch-icon.png'),
                },
                {
                    rel: 'icon',
                    sizes: '32x32',
                    href: adeptLink('/assets/favicon_io/favicon-32x32.png'),

                    type: 'image/png',
                },
                {
                    rel: 'icon',
                    sizes: '16x16',
                    href: adeptLink('/assets/favicon_io/favicon-16x16.png'),
                    type: 'image/png',
                }
            )

            // Dynamically add icons and manifest
            addFaviconLinks(icons, manifestPath)
        })
        .catch((error) => {
            console.error('Error loading manifest:', error)
        })
})
