export function getSanityConfig() {
  const projectId = process.env.NUXT_SANITY_PROJECT_ID
  const dataset = process.env.NUXT_SANITY_DATASET
  const token = process.env.NUXT_SANITY_TOKEN
  const apiVersion = process.env.NUXT_SANITY_API_VERSION

  if (!projectId) {
    throw createError({ statusCode: 500, message: 'NUXT_SANITY_PROJECT_ID is not configured' })
  }

  return { projectId, dataset, token, apiVersion }
}

export async function sanityFetch<T>(query: string): Promise<T> {
  const { projectId, dataset, token, apiVersion } = getSanityConfig()
  const encodedQuery = encodeURIComponent(query)

  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodedQuery}`

  const response = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  })

  const data = await response.json()
  return data.result
}
