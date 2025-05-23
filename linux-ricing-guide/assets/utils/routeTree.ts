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

const routeIcon = (route: RouteRecord | null): Record<string, string> => {
    if (route && route.meta?.icons) {
        return route.meta.icons as Record<string, string>
    }

    return { default: 'file-lines', mdi: 'file-document' }
}

class TreeBuilder {
    public static FromRoutes = (routes: RouteRecord[]): Tree => {
        let tree = new Tree()
        routes.forEach((route) => tree.add(route))
        return tree
    }
}

export { TreeBuilder, Tree, Node, routeName, routeIcon }
