<template>
  <section class="navigation-bar">
    <div class="bg-brand-red max-w-2xl mx-auto rounded-full px-4 sm:px-8">
      <div class="grid grid-cols-3 items-center">
        <!-- Left: Recent Post -->
        <div class="flex justify-start">
          <NuxtLink
            v-if="nextPost"
            :to="`/${nextPost.full_slug}`"
            class="flex items-center text-white h-12 md:h-14 group"
          >
            <span class="inline-block h-6 w-6 mr-2 transition-transform duration-300 group-hover:-translate-x-1">
              <svgo-arrow-left filled class="text-white" />
            </span>
            <div class="flex flex-col">
              <span class="font-medium opacity-100">Recent</span>
            </div>
          </NuxtLink>
          <!-- Disabled state when no next post -->
          <div
            v-else
            class="flex items-center text-white opacity-50 cursor-not-allowed"
          >
            <span class="inline-block h-6 w-6 mr-2">
              <svgo-arrow-left filled class="text-white" />
            </span>
            <div class="flex flex-col">
              <span class="font-medium">Recent</span>
            </div>
          </div>
        </div>

        <!-- Center: Counter -->
        <div class="flex items-center justify-center">
          <span class="font-semibold text-white">
            {{ posts.length - currentIndex }} / {{ posts.length }}
          </span>
        </div>

        <!-- Right: Previous Post -->
        <div class="flex justify-end">
          <NuxtLink
            v-if="previousPost"
            :to="`/${previousPost.full_slug}`"
            class="flex items-center text-white text-right h-12 md:h-14 group"
          >
            <div class="flex flex-col">
              <span class="font-medium opacity-100">Previous</span>
            </div>
            <span class="inline-block h-6 w-6 ml-2 transition-transform duration-300 group-hover:translate-x-1">
              <svgo-arrow-right filled class="text-white" />
            </span>
          </NuxtLink>
          <!-- Disabled state when no previous post -->
          <div
            v-else
            class="flex items-center text-white opacity-50 cursor-not-allowed text-right"
          >
            <div class="flex flex-col">
              <span class="font-medium">Previous</span>
            </div>
            <span class="inline-block h-6 w-6 ml-2">
              <svgo-arrow-right filled class="text-white" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  currentSlug: {
    type: String,
    required: true
  }
})

const posts = ref([])
const previousPost = ref(null)
const nextPost = ref(null)
const currentIndex = ref(-1)

const storyblokApi = useStoryblokApi()

// Fetch all portfolio posts (only once)
const { data } = await storyblokApi.get('cdn/stories', {
  starts_with: 'portfolio',
  is_startpage: false,
  sort_by: 'first_published_at:desc'
})

posts.value = data.stories

// Function to update navigation based on current slug
const updateNavigation = () => {
  // Find current post index
  const index = posts.value.findIndex(post => {
    const cleanCurrentSlug = props.currentSlug.replace(/^\//, '')
    
    return post.full_slug === cleanCurrentSlug || 
           post.full_slug === `portfolio/${cleanCurrentSlug}` ||
           post.slug === cleanCurrentSlug
  })

  currentIndex.value = index

  // Reset previous/next posts
  previousPost.value = null
  nextPost.value = null

  if (index !== -1) {
    // Next post (more recent) - only if not the first post
    if (index > 0) {
      nextPost.value = posts.value[index - 1]
    }

    // Previous post (older) - only if not the last post
    if (index < posts.value.length - 1) {
      previousPost.value = posts.value[index + 1]
    }
  }
}

// Watch for changes to currentSlug and update navigation
watch(() => props.currentSlug, () => {
  updateNavigation()
}, { immediate: true })

// Initial setup
updateNavigation()
</script>