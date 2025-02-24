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

    async upvote(distroName, shouldRemove = false) {
        try {
            // Fetch the distribution by name
            const response = await fetch(
                `${this.distrosUrl}?name=${encodeURIComponent(distroName)}`
            )
            if (!response.ok) {
                throw new Error(
                    `Error fetching distribution with name ${distroName}`
                )
            }
            const distros = await response.json()

            // Check if the distribution exists
            if (distros.length === 0) {
                throw new Error(
                    `Distribution with name ${distroName} not found`
                )
            }

            const distro = distros[0]

            // Increment the up-votes count
            const updatedUpVotes = distro['up-votes'] + (shouldRemove ? -1 : 1)

            // Send a PATCH request to update the up-votes count
            const patchResponse = await fetch(
                `http://localhost:3000/distros/${distro.id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'up-votes': updatedUpVotes }),
                }
            )

            if (!patchResponse.ok) {
                throw new Error(
                    `Error updating up-votes for distribution with name ${distroName}`
                )
            }

            console.log(
                `Up-voted distribution "${distroName}". New up-votes count: ${updatedUpVotes}`
            )
            return updatedUpVotes
        } catch (error) {
            console.error('Error:', error)
        }
    }

    async downvote(distroName, shouldRemove = false) {
        try {
            // Fetch the distribution by name
            const response = await fetch(
                `${this.distrosUrl}?name=${encodeURIComponent(distroName)}`
            )
            if (!response.ok) {
                throw new Error(
                    `Error fetching distribution with name ${distroName}`
                )
            }
            const distros = await response.json()

            // Check if the distribution exists
            if (distros.length === 0) {
                throw new Error(
                    `Distribution with name ${distroName} not found`
                )
            }

            const distro = distros[0]

            // Increment the down-votes count
            const updatedDownVotes =
                distro['down-votes'] + (shouldRemove ? -1 : 1)

            // Send a PATCH request to update the down-votes count
            const patchResponse = await fetch(
                `http://localhost:3000/distros/${distro.id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'down-votes': updatedDownVotes }),
                }
            )

            if (!patchResponse.ok) {
                throw new Error(
                    `Error updating down-votes for distribution with name ${distroName}`
                )
            }

            console.log(
                `Down-voted distribution "${distroName}". New down-votes count: ${updatedDownVotes}`
            )
            return updatedDownVotes
        } catch (error) {
            console.error('Error:', error)
        }
    }

    async getDistroData(distroName) {
        const response = await fetch(
            `${this.distrosUrl}?name=${encodeURIComponent(distroName)}`
        )

        if (!response.ok) {
            throw new Error(
                `Error fetching distribution with name ${distroName}`
            )
        }

        const distros = await response.json()

        if (distros.length === 0) {
            throw new Error(`Distribution with name ${distroName} not found`)
        }

        return distros[0]
    }
}

const LocalDevelopmentInstance = new BackendClient('http://localhost:3000')

LocalDevelopmentInstance.initialized.then(() => {
    Object.freeze(LocalDevelopmentInstance)
})

const GlobalBackendInstance = LocalDevelopmentInstance

export { GlobalBackendInstance }
