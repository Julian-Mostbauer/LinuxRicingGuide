class Component {
    componentCode = ''
    scriptElement = null
    validComponent = true
    props = {}

    constructor(componentCode, scriptElement) {
        this.componentCode = componentCode
        this.scriptElement = scriptElement

        this.collectProps()
        this.insertProps()
    }

    collectProps() {
        const attributes = this.scriptElement.attributes
        for (let i = 0; i < attributes.length; i++) {
            const attr = attributes[i]
            if (attr.name.startsWith('data-')) {
                const prop = attr.name.replace('data-', '')
                this.props[prop] = attr.value
            }
        }

        // Check for missing required props in the component code
        const requiredProps = [
            ...this.componentCode.matchAll(/{{(.*?)}}/g),
        ].map((match) => match[1])
        requiredProps.forEach((prop) => {
            if (!(prop in this.props)) {
                console.error(
                    `Property "${prop}" is required but not provided.`
                )
                this.validComponent = false
                this.props[prop] = null
            }
        })
    }

    insertProps() {
        if (!this.validComponent) {
            console.error('Invalid component. Cannot insert props.')
            return
        }

        for (const [prop, value] of Object.entries(this.props)) {
            const propRegex = new RegExp(`{{${prop}}}`, 'g')
            this.componentCode = this.componentCode.replace(
                propRegex,
                value || ''
            )
        }
    }

    placeComponent() {
        if (!this.validComponent) {
            console.error('Invalid component. Cannot place component.')
            return
        }

        const template = document.createElement('template')
        template.innerHTML = this.componentCode.trim()

        const content = template.content.cloneNode(true)
        this.scriptElement.replaceWith(content)
    }
}

export default class ComponentBuilder {
    constructor(code, name) {
        this.name = name
        this.code = code
    }

    build() {
        document
            .querySelectorAll(`script[data-component="${this.name}"]`)
            .forEach((scriptTag) => {
                const startTime = performance.now()

                const comp = new Component(this.code, scriptTag)
                comp.placeComponent()

                console.log(
                    `Component "${comp.props['component']}" rendered in ${
                        performance.now() - startTime
                    }ms`
                )

                console.table(comp.props)
            })
    }
}
