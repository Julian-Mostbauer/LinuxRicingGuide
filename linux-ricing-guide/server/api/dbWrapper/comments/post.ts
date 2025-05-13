export default defineEventHandler(async (event) => {
    const endPoint: string = useRuntimeConfig().public.backendAddress as string

    const { name, id, content } = await readBody(event)
    console.log('Received data:', { name, id, content })
    if (!id) {
        return { error: 'ID is required' }
    }

    try {
        const response = await $fetch(`${endPoint}/comments/post/${name}`, {
            timeout: 5000,
            method: 'POST',
            headers: { 'X-User-ID': id },
            body: { content: content },
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
