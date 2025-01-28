document.addEventListener('DOMContentLoaded', function () {
    const linkAppleTouchIcon = document.createElement('link')
    linkAppleTouchIcon.rel = 'apple-touch-icon'
    linkAppleTouchIcon.sizes = '180x180'
    linkAppleTouchIcon.href = '/assets/favicon_io/apple-touch-icon.png'
    document.head.appendChild(linkAppleTouchIcon)

    const linkIcon32 = document.createElement('link')
    linkIcon32.rel = 'icon'
    linkIcon32.type = 'image/png'
    linkIcon32.sizes = '32x32'
    linkIcon32.href = '/assets/favicon_io/favicon-32x32.png'
    document.head.appendChild(linkIcon32)

    const linkIcon16 = document.createElement('link')
    linkIcon16.rel = 'icon'
    linkIcon16.type = 'image/png'
    linkIcon16.sizes = '16x16'
    linkIcon16.href = '/assets/favicon_io/favicon-16x16.png'
    document.head.appendChild(linkIcon16)

    const linkIconChrome192 = document.createElement('link')
    linkIcon16.rel = 'icon'
    linkIcon16.type = 'image/png'
    linkIcon16.sizes = '192x192'
    linkIcon16.href = '/assets/favicon_io/android-chrome-192x192.png'
    document.head.appendChild(linkIconChrome192)

    const linkIconChrome512 = document.createElement('link')
    linkIcon16.rel = 'icon'
    linkIcon16.type = 'image/png'
    linkIcon16.sizes = '512x512'
    linkIcon16.href = '/assets/favicon_io/android-chrome-512x512.png'
    document.head.appendChild(linkIconChrome512)

    const linkManifest = document.createElement('link')
    linkManifest.rel = 'manifest'
    linkManifest.href = '/assets/favicon_io/site.webmanifest'
    document.head.appendChild(linkManifest)
})
