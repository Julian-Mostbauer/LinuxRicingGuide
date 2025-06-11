export default defineEventHandler(async (event) => {
    const endPoint: string = useRuntimeConfig().public.backendAddress as string

    const { id, commentId } = await readBody(event)

    if (!id) {
        return { error: 'ID is required' }
    }

    try {
        const response = await $fetch(
            `${endPoint}/comments/${commentId}/downvote`,
            {
                timeout: 5000,
                method: 'POST',
                headers: { 'X-User-ID': id },
            }
        )
        return { data: response }
    } catch (error: any) {
        console.error('Error fetching distro info:', error)
        if (error.name === 'FetchError' && error.type === 'request-timeout') {
            return { error: 'Request timed out' }
        }
        return { error: error.message || 'Unknown error' }
    }
})
