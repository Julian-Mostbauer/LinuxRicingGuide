const baseUrl = 'http://localhost:3000'
const distrosUrl = baseUrl + '/distros'

const upvote = async (distroName, shouldRemove = false) => {
    try {
        // Fetch the distribution by name
        const response = await fetch(
            `${distrosUrl}?name=${encodeURIComponent(distroName)}`
        )
        if (!response.ok) {
            throw new Error(
                `Error fetching distribution with name ${distroName}`
            )
        }
        const distros = await response.json()

        // Check if the distribution exists
        if (distros.length === 0) {
            throw new Error(`Distribution with name ${distroName} not found`)
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

const downvote = async (distroName, shouldRemove = false) => {
    try {
        // Fetch the distribution by name
        const response = await fetch(
            `${distrosUrl}?name=${encodeURIComponent(distroName)}`
        )
        if (!response.ok) {
            throw new Error(
                `Error fetching distribution with name ${distroName}`
            )
        }
        const distros = await response.json()

        // Check if the distribution exists
        if (distros.length === 0) {
            throw new Error(`Distribution with name ${distroName} not found`)
        }

        const distro = distros[0]

        // Increment the down-votes count
        const updatedDownVotes = distro['down-votes'] + (shouldRemove ? -1 : 1)

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

const getDistroData = async (distroName) => {
    const response = await fetch(
        `${distrosUrl}?name=${encodeURIComponent(distroName)}`
    )

    if (!response.ok) {
        throw new Error(`Error fetching distribution with name ${distroName}`)
    }

    const distros = await response.json()

    if (distros.length === 0) {
        throw new Error(`Distribution with name ${distroName} not found`)
    }

    return distros[0]
}

export { upvote, downvote, getDistroData }
