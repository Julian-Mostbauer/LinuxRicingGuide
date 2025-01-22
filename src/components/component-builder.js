const errorCompStyle = `border: 1px solid red;
padding: 10px; display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
max-width: fit-content;
margin: 0 auto;
margin-top: 1rem;
border-radius: 5px;`

class Component {
    constructor(scriptElement, componentCode, onMount) {
        this.componentCode = componentCode
        this.scriptElement = scriptElement
        this.onMount = onMount

        this.props = {}
        this.errors = []
        this.buildInProps = []

        this.generateBuildInProps()
        this.collectProps()

        this.totalProps = { ...this.buildInProps, ...this.props }
    }

    generateBuildInProps() {
        this.buildInProps = {
            'component-name': '{{component}}',
            'component-code': this.componentCode,
            'component-props': JSON.stringify(this.props),
            'component-unique-id': crypto.randomUUID(),
        }
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
                this.errors.push(
                    `Property <mark>${prop}</mark> is required but not provided.`
                )
                this.props[prop] = null
            }
        })

        // Check for unexpected props in the component code
        const unexpectedProps = Object.keys(this.props).filter(
            (prop) => !requiredProps.includes(prop)
        )

        unexpectedProps.forEach((prop) => {
            if (prop === 'component') return // Ignore the component name
            this.errors.push(
                `Property <mark>${prop}</mark> is not recognized by the component.`
            )
            delete this.props[prop]
        })
    }

    insertProps() {
        if (this.errors.length > 0) {
            // Build error component
            this.componentCode = `
                <div style="${errorCompStyle}">
                    <h2 style="color: red">Component Error</h2>
                    <h3 style="color: yellow">${this.props.component}</h3>
                    <div style="color: grey;">
                        <ul>
                        ${this.errors
                            .map((error) => `<li>${error}</li>`)
                            .join('')}
                        </ul>
                    </div>
                <div>
            `
            return
        }

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
        if (this.errors.length > 0) {
            console.error('Invalid component. Cannot place component.')
            this.errors.forEach((error) => console.error(error))
        }

        const template = document.createElement('template')
        template.innerHTML = this.componentCode.trim()

        const content = template.content.cloneNode(true)
        this.scriptElement.replaceWith(content)
    }

    async placeComponent() {
        this.insertProps()
        this.buildComponent()
        if (this.onMount === undefined) return

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
}

export default class ComponentBuilder {
    constructor(name, code, onMount = undefined) {
        this.name = name
        this.code = code
        this.onMount = onMount
    }

    async build() {
        const scriptTags = document.querySelectorAll(
            `script[data-component="${this.name}"]`
        )

        const startTimes = new Map() // To track start times for each component

        // Convert NodeList to Array and map to promises for parallel processing
        const promises = Array.from(scriptTags).map(async (scriptTag) => {
            const startTime = performance.now()
            startTimes.set(scriptTag, startTime)

            const comp = new Component(scriptTag, this.code, this.onMount)
            await comp.placeComponent()

            console.info(
                `Component "${comp.props['component']}" rendered in ${
                    performance.now() - startTime
                }ms`
            )
            return comp
        })

        // Wait for all components to render
        await Promise.all(promises)
        console.info(`All components of ${this.name} rendered.`)
    }
}
