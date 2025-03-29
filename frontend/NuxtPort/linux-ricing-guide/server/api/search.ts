export default defineEventHandler(async (event) => {
    const { q } = getQuery(event)
    if (!q) {
        return {
            error: 'No query provided',
        }
    }
    return {
        result: q,
    }
})
