import type { Router } from 'vue-router'

export default (inp: string, router: Router) => {
    const getAllPages = () => {
        const pages = router.getRoutes().map((route) => route.path)
        console.log('All pages:', pages)
        return pages
    }

    const pages = getAllPages()
    const found = pages.find((page) => page.includes(inp))
    if (found) {
        console.log('Found:', found)
    } else {
        console.log('Not found')
    }
}
