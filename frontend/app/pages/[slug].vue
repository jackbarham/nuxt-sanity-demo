<template>
  <main v-if="post">
    <p>Check if page is loaded</p>
    <NuxtLink to="/" class="hover:underline">&larr; Back to posts</NuxtLink>
    <img
      v-if="post.image"
      :src="urlFor(post.image).width(550).height(310).url()"
      :alt="post?.title"
      class="aspect-video rounded-xl"
      width="550"
      height="310"
    />
    <h1 v-if="post.title">{{ post.title }}</h1>
    <div class="prose">
      <p v-if="post.publishedAt">
        Published: {{ new Date(post.publishedAt).toLocaleDateString() }}
      </p>
      <PortableText v-if="post.body" :value="post.body" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { PortableText } from '@portabletext/vue'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  image?: {
    asset: {
      _ref: string
    }
  }
  body?: any[]
}

const { params } = useRoute()
const query = `*[_type == "post" && slug.current == $slug][0]`

const { data: post } = await useSanityQuery<Post>(query, { slug: params.slug })
const urlFor = useSanityImageUrl()
</script>
