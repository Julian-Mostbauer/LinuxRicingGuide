class Component {
    constructor(componentSpawnElement, componentName, componentCode, onMount) {
        this.componentCode = componentCode
        this.componentSpawnElement = componentSpawnElement
        this.onMount = onMount
        this.componentName = componentName

        this.props = {}
        this.errors = []
        this.buildInProps = []

        this.generateBuildInProps()
        this.collectProps()
        this.validateProps()
        if (this.errors.length > 0) return

        this.totalProps = { ...this.buildInProps, ...this.props }
        console.table(this.totalProps)
    }

    generateBuildInProps() {
        this.buildInProps = {
            'component-name': this.componentName,
            'component-code': this.componentCode,
            'component-props': JSON.stringify(this.props),
            'component-unique-id': crypto.randomUUID(),
        }
    }

    collectProps() {
        const attributes = this.componentSpawnElement.attributes
        for (let i = 0; i < attributes.length; i++) {
            const attr = attributes[i]
            if (
                attr.name.startsWith('data-') &&
                attr.name !== 'data-component' // do not collect the data-component of old syntax
            ) {
                const prop = attr.name.replace('data-', '')
                this.props[prop] = attr.value
            }
        }
    }

    validateProps() {
        const requiredProps = new Set(
            [...this.componentCode.matchAll(/{{(.*?)}}/g)].map(
                (match) => match[1]
            )
        )

        Object.keys(this.props).forEach((prop) => {
            if (!requiredProps.has(prop)) {
                this.errors.push(
                    `Property <mark>${prop}</mark> is not recognized by the component.`
                )
                delete this.props[prop]
            }
        })

        requiredProps.forEach((prop) => {
            if (!(prop in this.props)) {
                this.errors.push(
                    `Property <mark>${prop}</mark> is required but not provided.`
                )
                delete this.props[prop]
            }
        })
    }

    insertProps() {
        // Replace internal props ||name||
        for (const [prop, value] of Object.entries(this.buildInProps)) {
            const internalPropRegex = new RegExp(`\\|\\|${prop}\\|\\|`, 'g')
            this.componentCode = this.componentCode.replace(
                internalPropRegex,
                value || ''
            )
        }

        // Replace custom props {{name}}
        for (const [prop, value] of Object.entries(this.props)) {
            const propRegex = new RegExp(`{{${prop}}}`, 'g')
            this.componentCode = this.componentCode.replace(
                propRegex,
                value || ''
            )
        }
    }

    buildComponent() {
        const template = document.createElement('template')
        template.innerHTML = this.componentCode.trim()

        const content = template.content.cloneNode(true)
        this.componentSpawnElement.replaceWith(content)
    }

    generateErrorComponent() {
        console.error('Invalid component. Cannot place component.')
        this.errors.forEach((error) => console.error(error))

        this.componentCode = `
        <div style="border: 1px solid red;
        padding: 10px; display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        max-width: fit-content;
        margin: 0 auto;
        border-radius: 5px;">
            <h2 style="color: red">Component Error</h2>
            <h3 style="color: yellow">${this.componentName}</h3>
            <div style="color: grey;">
                <ul>
                ${this.errors.map((error) => `<li>${error}</li>`).join('')}
                </ul>
            </div>
        <div>
    `
    }

    async onMountPerfWrapper() {
        try {
            var startTime = performance.now()
            await this.onMount(this.totalProps)
        } catch (e) {
            console.error('Error: onMount function failed')
            console.error(e)
        } finally {
            console.info('OnMount ran in', performance.now() - startTime, 'ms')
        }
    }

    async placeComponent() {
        if (this.errors.length > 0) {
            this.generateErrorComponent()
        } else {
            this.insertProps()
        }

        this.buildComponent()

        if (this.onMount === undefined || this.errors.length > 0) return
        await this.onMountPerfWrapper()
    }
}

export default class ComponentBuilder {
    constructor(componentName, code, onMount = undefined) {
        this.componentName = componentName
        this.code = code
        this.onMount = onMount
    }

    async build() {
        const oldSyntax = `script[data-component="${this.componentName}"]`
        const newSyntax = `${this.componentName}`

        const componentTags = [
            ...document.querySelectorAll(oldSyntax),
            ...document.querySelectorAll(newSyntax),
        ]

        console.log(componentTags)

        const startTimes = new Map() // To track start times for each component

        // Convert NodeList to Array and map to promises for parallel processing
        const promises = Array.from(componentTags).map(async (componentTag) => {
            const startTime = performance.now()
            startTimes.set(componentTag, startTime)

            const comp = new Component(
                componentTag,
                this.componentName,
                this.code,
                this.onMount
            )
            await comp.placeComponent()

            console.info(
                `Component "${comp.componentName}" rendered in ${
                    performance.now() - startTime
                }ms`
            )
            return comp
        })

        // Wait for all components to render
        await Promise.all(promises)
        console.info(`All components of ${this.componentName} rendered.`)
    }
}
