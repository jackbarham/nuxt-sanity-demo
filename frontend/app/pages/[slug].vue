<template>
  <main
    v-if="post"
    class="container mx-auto max-w-3xl p-8 flex flex-col gap-4"
  >
    <NuxtLink to="/" class="hover:underline">&larr; Back to posts</NuxtLink>
    <img
      v-if="post.image"
      :src="urlFor(post.image)?.width(550).height(310).url()"
      :alt="post?.title"
      class="aspect-video rounded-xl"
      width="550"
      height="310"
    />
    <h1 v-if="post.title" class="text-4xl font-bold mb-8">{{ post.title }}</h1>
    <div class="prose">
      <p v-if="post.publishedAt">
        Published: {{ new Date(post.publishedAt).toLocaleDateString() }}
      </p>
      <SanityContent v-if="post.body" :blocks="post.body" />
    </div>
  </main>
</template>

<script setup lang="ts">
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  image?: { asset: { _ref: string } };
  body?: Array<{ _type: string; children: Array<{ text: string }> }>;
}

const { params } = useRoute();
const { data } = await useFetch<{ post: Post; projectId: string; dataset: string }>(`/api/post/${params.slug}`);

const post = computed(() => data.value?.post);
const projectId = computed(() => data.value?.projectId);
const dataset = computed(() => data.value?.dataset);

const urlFor = (source: SanityImageSource) =>
  projectId.value && dataset.value
    ? imageUrlBuilder({ projectId: projectId.value, dataset: dataset.value }).image(source)
    : null;
</script>
