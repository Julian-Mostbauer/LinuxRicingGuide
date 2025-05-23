export default defineEventHandler(async (event) => {
    const endPoint: string = useRuntimeConfig().public.backendAddress as string

    console.log("entrance server")

    const { id, commentId } = await readBody(event)

    try {
        const response = await $fetch(`${endPoint}/comments/${commentId}`, {
            timeout: 5000,
            method: 'GET',
            headers: { 'X-User-ID': id },
        })
        return { data: response }
    } catch (error: any) {
        console.error('Error fetching distro info:', error)
        if (error.name === 'FetchError' && error.type === 'request-timeout') {
            return { error: 'Request timed out' }
        }
        return { error: error.message || 'Unknown error' }
    }
})
