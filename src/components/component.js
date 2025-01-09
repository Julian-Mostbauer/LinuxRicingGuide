export default class Component {
    componentCode = ''
    componentId = ''
    targetElement = null
    validComponent = true
    props = {}

    constructor(componentCode, componentId) {
        this.componentCode = componentCode
        this.componentId = componentId.trim()
        this.targetElement = document.getElementById(this.componentId)

        if (!this.targetElement) {
            console.error(`Element with ID "${this.componentId}" not found.`)
            this.validComponent = false
        }

        this.collectProps()
        this.insertProps()
    }

    collectProps() {
        if (!this.validComponent) {
            console.error('Invalid component. Cannot collect props.')
            return
        }

        const propRegex = /{{(.*?)}}/g
        const matches = this.componentCode.matchAll(propRegex)

        for (const match of matches) {
            const prop = match[1]
            this.props[prop] = null
        }

        const attributes = this.targetElement.attributes
        for (let i = 0; i < attributes.length; i++) {
            const attr = attributes[i]
            if (attr.name.startsWith('data-')) {
                const prop = attr.name.replace('data-', '')
                if (this.props[prop] !== undefined) {
                    this.props[prop] = attr.value
                } else {
                    console.warn(`Property "${prop}" not found in component.`)
                }
            }
        }

        // check if all props are filled
        for (const prop in this.props) {
            if (this.props[prop] === null) {
                console.error(`Property "${prop}" required in component.`)
                this.validComponent = false
                return
            }
        }
    }

    insertProps() {
        if (!this.validComponent) {
            console.error('Invalid component. Cannot insert props.')
            return
        }

        for (const prop in this.props) {
            const propRegex = new RegExp(`{{${prop}}}`, 'g')
            this.componentCode = this.componentCode.replace(
                propRegex,
                this.props[prop]
            )
        }
    }

    placeComponent() {
        if (!this.validComponent) {
            console.error('Invalid component. Cannot place component.')
            return
        }

        console.debug('Placing component:', this.componentId)

        const template = document.createElement('template')
        template.innerHTML = this.componentCode.trim()

        const content = template.content.cloneNode(true)
        this.targetElement.replaceWith(content)
    }
}
