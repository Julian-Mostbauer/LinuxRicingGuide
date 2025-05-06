export default defineEventHandler(async (event) => {
  const endPoint: string = useRuntimeConfig().public.backendHealthEndpoint as string
  try {
    const response = await $fetch(endPoint, { timeout: 5000 }) 
    return { healthy: true, data: response }
  } catch (error: any) {
    console.error('Error fetching backend health:', error)
    if (error.name === 'FetchError' && error.type === 'request-timeout') {
      return { healthy: false, error: 'Request timed out' }
    }
    return { healthy: false, error: error.message || 'Unknown error' }
  }
})