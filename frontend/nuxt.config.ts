import { fileURLToPath } from 'url'
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  modules: ['@nuxtjs/sanity'],
  sanity: {
    projectId: process.env.NUXT_SANITY_PROJECT_ID,
    dataset: process.env.NUXT_SANITY_DATASET,
    apiVersion: process.env.NUXT_SANITY_API_VERSION,
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  alias: {
    '@sanity/visual-editing': fileURLToPath(new URL('./mocks/visual-editing.js', import.meta.url)),
  },
})
