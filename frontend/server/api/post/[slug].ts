import { getSanityConfig, sanityFetch } from '../../utils/sanity'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const { projectId, dataset } = getSanityConfig()

  const query = `*[_type == "post" && slug.current == "${slug}"][0]`
  const post = await sanityFetch(query) || null

  return { post, projectId, dataset }
})
