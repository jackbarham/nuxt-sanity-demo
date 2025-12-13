export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {
    enabled: true
  },
  modules: ['@nuxtjs/sanity'],
  sanity: {
    projectId: process.env.NUXT_SANITY_PROJECT_ID,
    dataset: process.env.NUXT_SANITY_DATASET || 'production',
    apiVersion: process.env.NUXT_SANITY_API_VERSION || '2025-10-01',
  },
  // vite: {
  //   optimizeDeps: {
  //     include: ['react-compiler-runtime', 'react', 'react-dom']
  //   }
  // }
})