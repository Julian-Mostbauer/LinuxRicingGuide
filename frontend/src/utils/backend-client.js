import { logger, PRIORITY } from './logger.js'

class BackendClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
        this.distrosUrl = baseUrl + '/distros'
        this.isActive = false
        this.initialized = this.initialize()
    }

    async initialize() {
        this.isActive = await this.testConnection()

        if (this.isActive) {
            logger.log('Connection to the backend is active', PRIORITY.INFO)
        } else {
            logger.log(
                'Connection to the backend is not active',
                PRIORITY.ERROR
            )

            // Overwrite all functions with fallback
            Object.entries(this).forEach(([key, value]) => {
                if (typeof value === 'function' && key !== 'initialize') {
                    this[key] = () => {
                        logger.log(
                            'Connection to the backend is not active',
                            PRIORITY.WARN
                        )
                    }
                }
            })
        }
    }

    async testConnection() {
        return fetch(this.baseUrl)
            .then((response) => response.ok)
            .catch(() => false)
    }

    async fetchDistro(distroName) {
        // Fetch the distribution by name
        const response = await fetch(`${this.distrosUrl}?name=${encodeURIComponent(distroName)}`)

        if (!response.ok) {
            throw new Error(`Error fetching distribution with name ${distroName}`)
        }

        const distros = await response.json()

        // Check if the distribution exists
        if (distros.length === 0) {
            throw new Error(`Distribution with name ${distroName} not found`)
        }

        return distros[0]
    }

    async patchDistro(distroName, distroId, updatedData) {
        // Send a PATCH request to update the up-votes count
        const patchResponse = await fetch(
            `http://localhost:3000/distros/${distroId}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            }
        )

        if (!patchResponse.ok) {
            throw new Error(`Error updating distribution with name ${distroName}`)
        }
    }

    async upvote(distroName, shouldRemove = false) {
        try {

            const distro = await this.fetchDistro(distroName)

            // Increment the up-votes count
            const updatedUpVotes = distro['up-votes'] + (shouldRemove ? -1 : 1)

            await this.patchDistro(distroName, distro.id, {'up-votes': updatedUpVotes})

            console.log(`Modified distribution "${distroName}" by ${shouldRemove ? -1 : 1}. New up-votes count: ${updatedUpVotes}`)
            return updatedUpVotes
        } catch (error) {
            console.error('Error:', error)
        }
    }

    async downvote(distroName, shouldRemove = false) {
        try {
            const distro = await this.fetchDistro(distroName)

            // Increment the down-votes count
            const updatedDownVotes = distro['down-votes'] + (shouldRemove ? -1 : 1)

            await this.patchDistro(distroName, distro.id, {'down-votes': updatedDownVotes})

            console.log(`Modified distribution "${distroName}" by ${shouldRemove ? -1 : 1}. New down-votes count: ${updatedDownVotes}`)
            return updatedDownVotes
        } catch (error) {
            console.error('Error:', error)
        }
    }
}

const LocalDevelopmentInstance = new BackendClient('http://localhost:3000')

LocalDevelopmentInstance.initialized.then(() => {
    Object.freeze(LocalDevelopmentInstance)
})

const GlobalBackendInstance = LocalDevelopmentInstance

export { GlobalBackendInstance }
