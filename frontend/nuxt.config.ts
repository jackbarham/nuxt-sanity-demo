import { fileURLToPath } from 'url'
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  modules: [
    '@nuxtjs/sanity',
    'nuxt-svgo',
  ],
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
  runtimeConfig: {
    public: {
      appTitle: 'Nuxt & Sanity Demo'
    }
  },
  app: {
    pageTransition: { 
      name: 'page', 
      mode: 'out-in' 
    },
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Nuxt & Sanity Demo',
      meta: [
        { 
          name: 'description', 
          content: 'Starter template for Nuxt v4 with Sanity CMS integration.'
        }
      ],
      link: [
        { 
          rel: 'shortcut icon', 
          type: 'image/png', 
          href: '/favicon.png?v=1'
        },
      ],
    }
  }
})
