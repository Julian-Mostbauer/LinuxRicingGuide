import { logger, PRIORITY } from '../utils/logger.js'

class Component {
    constructor(componentSpawnElement, componentName, componentCode, onMount) {
        this.componentCode = componentCode
        this.componentSpawnElement = componentSpawnElement
        this.onMount = onMount
        this.componentName = componentName
        this.uuid = crypto.randomUUID()

        this.props = {}
        this.errors = []
        this.buildInProps = []

        this.generateBuildInProps()
        this.collectProps()
        this.validateProps()
        if (this.errors.length > 0) return

        this.totalProps = { ...this.buildInProps, ...this.props }
    }

    generateBuildInProps() {
        this.buildInProps = {
            'component-name': this.componentName,
            'component-code': this.componentCode,
            'component-props': JSON.stringify(this.props),
            'component-unique-id': this.uuid,
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
        logger.table('Inserting props:', this.totalProps, PRIORITY.DEBUG)

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
        logger.log('Invalid component. Cannot place component.', PRIORITY.ERROR)
        this.errors.forEach((error) => logger.log(error, PRIORITY.ERROR))

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
            logger.log('Error: onMount function failed', PRIORITY.WARN)
            logger.log(e, PRIORITY.WARN)
        } finally {
            logger.log(
                'OnMount ran in',
                performance.now() - startTime,
                'ms',
                PRIORITY.DEBUG
            )
        }
    }

    preloadImages(){
        document.querySelectorAll('img[data-src]').forEach((img) => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img.getAttribute('data-src');
            document.head.appendChild(link);
        });
    };
    
    lazyLoadImages() {
        const images = this.componentSpawnElement.querySelectorAll('img[data-src]');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.onload = () => img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
    
        images.forEach((img) => observer.observe(img));
    };
    

    async placeComponent() {
        if (this.errors.length > 0) {
            this.generateErrorComponent()
        } else {
            this.insertProps()
        }

        this.buildComponent()
        
        this.preloadImages()
        this.lazyLoadImages()

        const images = document.querySelectorAll('img[data-src]');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.onload = () => img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
    
        images.forEach((img) => observer.observe(img));

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

    collectComponentTags() {
        const oldSyntax = `script[data-component="${this.componentName}"]`
        const newSyntax = `${this.componentName}`

        return [
            ...document.querySelectorAll(oldSyntax),
            ...document.querySelectorAll(newSyntax),
        ]
    }

    async build() {
        const componentTags = this.collectComponentTags()
        
        logger.log(
            `Found ${componentTags.length} instances of ${this.componentName}`,
            PRIORITY.INFO
        )

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

            logger.log(
                `Component "${comp.componentName}" rendered in ${
                    performance.now() - startTime
                }ms`,
                PRIORITY.DEBUG
            )
            return comp
        })

        // Wait for all components to render
        await Promise.all(promises)
        logger.log(
            `All components of ${this.componentName} rendered.`,
            PRIORITY.INFO
        )
    }
}
