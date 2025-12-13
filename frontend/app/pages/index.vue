<script setup lang="ts">
interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
}

const { data } = await useFetch<{ posts: Post[] }>('/api/posts');
const posts = computed(() => data.value?.posts || []);
</script>

<template>
  <main class="container mx-auto min-h-screen max-w-3xl p-8">
    <h1 class="text-4xl font-bold mb-8">Posts</h1>
    <ul class="flex flex-col gap-y-4">
      <li v-for="post in posts" :key="post._id" class="hover:underline">
        <NuxtLink :to="`/${post.slug.current}`">
          <h2 class="text-xl font-semibold">{{ post.title }}</h2>
          <p>{{ new Date(post.publishedAt).toLocaleDateString() }}</p>
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>
