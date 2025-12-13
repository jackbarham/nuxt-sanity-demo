import { sanityFetch } from '../utils/sanity'

export default defineEventHandler(async () => {
  const query = `*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`
  const posts = await sanityFetch(query) || []

  return { posts }
})
