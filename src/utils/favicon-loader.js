const addFaviconLinks = (icons, manifestPath) => {
    const createLink = ({ rel, sizes, href, type }) => {
        const link = document.createElement('link')
        link.rel = rel
        link.href = href
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
    const manifestPath =
        window.location.hostname.includes("github")
            ? '/LinuxRicingGuide'
            : '' + '/assets/favicon_io/site.webmanifest'

    fetch(manifestPath)
        .then((response) => response.json())
        .then((data) => {
            const icons = data.icons.map((icon) => ({
                rel: 'icon',
                sizes: icon.sizes,
                href: icon.src,
                type: icon.type,
            }))

            // Add additional icons not in the manifest
            icons.push(
                {
                    rel: 'apple-touch-icon',
                    href: '/assets/favicon_io/apple-touch-icon.png',
                },
                {
                    rel: 'icon',
                    sizes: '32x32',
                    href: '/assets/favicon_io/favicon-32x32.png',
                    type: 'image/png',
                },
                {
                    rel: 'icon',
                    sizes: '16x16',
                    href: '/assets/favicon_io/favicon-16x16.png',
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
