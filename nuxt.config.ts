import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  // Compatibility
  compatibilityDate: '2024-11-11',
  future: {
    compatibilityVersion: 4,
  },

  // Build settings
  build: {
    transpile: ['vuetify'],
  },

  // Auto-import stores
  imports: {
    dirs: ['./stores'],
  },

  // Apollo module setup
  modules: [
    '@nuxtjs/apollo',
    ['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }],
  ],

  // Apollo client config
  apollo: {
    autoImports: true,
    proxyCookies: true,
    clients: {
      default: {
        httpEndpoint: 'https://spacex-production.up.railway.app/',
      },
    },
  },

  // Vite config with Vuetify and graphql-tag
  vite: {
    plugins: [vuetify()],
    optimizeDeps: {
      include: ['graphql-tag'],
    },
  },
})
