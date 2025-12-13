import { createClient, type QueryParams } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const useSanityClient = () => {
  const config = useRuntimeConfig()
  const { projectId, dataset, apiVersion } = config.public.sanity

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
  })
}

export const useSanityQuery = async <T>(query: string, params?: QueryParams) => {
  const client = useSanityClient()
  const data = await useAsyncData<T>(
    query,
    () => client.fetch<T>(query, params)
  )
  return data
}

export const useSanityImageUrl = () => {
  const config = useRuntimeConfig()
  const { projectId, dataset } = config.public.sanity
  const builder = imageUrlBuilder({ projectId, dataset })

  return (source: SanityImageSource) => builder.image(source)
}
