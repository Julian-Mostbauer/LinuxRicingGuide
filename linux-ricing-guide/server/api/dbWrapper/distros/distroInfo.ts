import { DistroInfo } from "~/assets/types/backendTypes";

export default defineEventHandler(async (event) => {
  const endPoint: string = useRuntimeConfig().public.backendAddress as string

  const { name, id } = await readBody(event);

  if (!id) {
    return { error: 'ID is required' }
  }

  try {
    const response: DistroInfo = await $fetch(`${endPoint}/distros/${name}`, {
        timeout: 5000,
        headers: { 'X-User-ID': id },
    })
    return { data: response }
  }catch (error: any) {
    console.error('Error fetching distro info:', error)
    if (error.name === 'FetchError' && error.type === 'request-timeout') {
      return { error: 'Request timed out' }
    }
    return { error: error.message || 'Unknown error' }
  }
});