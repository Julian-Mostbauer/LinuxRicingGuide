import type { RouteRecord } from 'vue-router'
import { toHeaderCase } from './caseUtils'

class Node {
    public Value: RouteRecord | null
    public Children: Node[]
    public HasIndex: boolean

    public constructor(value: RouteRecord | null) {
        this.Value = value
        this.Children = []
        this.HasIndex = false
    }
}

class Tree {
    public Root: Node

    public constructor() {
        this.Root = new Node(null)
    }

    public add(route: RouteRecord) {
        const parts = route.path
            .replace(/^\/|\/$/g, '')
            .split('/')
            .filter(Boolean)
        let current = this.Root

        for (let i = 0; i < parts.length; i++) {
            let node = current.Children.find(
                (child) => child.Value?.path === parts[i]
            )

            if (!node) {
                node = new Node({ path: parts[i] } as RouteRecord)
                current.Children.push(node)
            }

            current = node
        }

        // Properly detect index pages
        if (
            route.path.endsWith('/' + parts[parts.length - 1]) ||
            route.path === '/'
        ) {
            current.HasIndex = true
        }

        current.Value = route
    }
}

const routeName = (
    fullPath: string | null | undefined,
    fallBackName: string = 'no fallback provided'
) => {
    const name = fullPath?.split('/').pop() || fallBackName
    return toHeaderCase(name)
}

const routeIcon = (route: RouteRecord) => {
    if (route.meta?.icon) {
        return route.meta.icon
    }

    return 'file-lines'
}

export { Tree, Node, routeName, routeIcon }
