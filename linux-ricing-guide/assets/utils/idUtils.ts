import type { Auth0VueClient } from '@auth0/auth0-vue'

const isValidID = (id: string): boolean => {
    if (id === undefined || id === null) return false

    const parts = id.split('|')
    if (parts.length != 2) return false

    switch (parts[0]) {
        case 'windowslive':
            return /^[a-fA-F0-9]{16}$/.test(parts[1])
        case 'google-oauth2':
            return /^\d{21}$/.test(parts[1])
        case 'github':
            return /^\d+$/.test(parts[1])
        default:
            return false
    }
}

const getUserID = async (auth0: Auth0VueClient): Promise<string> => {
    let counter = 2
    while (auth0.user.value?.sub == undefined) {
        await new Promise((resolve) => setTimeout(resolve, counter))
        counter *= 2

        if (counter > 10000) {
            console.error('Timeout waiting for auth0 to load')
            return ''
        }
    }
    return auth0.user.value?.sub ?? ''
}

export { getUserID, isValidID }
