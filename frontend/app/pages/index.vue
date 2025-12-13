<template>
  <main class="">
    <h1 class="">Posts</h1>
    <p>Some text content here.</p>
    <ul class="">
      <li v-for="post in posts" :key="post._id">
        <NuxtLink :to="`/${post.slug.current}`">
          <h2 class="">{{ post.title }}</h2>
          <p>{{ new Date(post.publishedAt).toLocaleDateString() }}</p>
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
}

const query = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`

const { data: posts } = await useSanityQuery<Post[]>(query)
</script>