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
    componentCode = ''
    scriptElement = null
    props = {}
    errors = []

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
                this.errors.push(
                    `Property "${prop}" is required but not provided.`
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
                `Property "${prop}" is not recognized by the component.`
            )
            delete this.props[prop]
        })
    }

    insertProps() {
        if (this.errors.length > 0) {
            // Build error component
            this.componentCode = `
                <div style="${errorCompStyle}">
                    <h2>!Component Error! ${this.props.component}</h2>
                    <div style="color: red;">
                        ${this.errors.join('<br>')}
                    </div>
                <div>
            `
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
        if (this.errors.length > 0) {
            console.error('Invalid component. Cannot place component.')
            this.errors.forEach((error) => console.error(error))
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
