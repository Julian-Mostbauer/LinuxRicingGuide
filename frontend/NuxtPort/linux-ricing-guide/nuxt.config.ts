import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['localhost', 'among-ts-persian-mixed.trycloudflare.com', 'warren-itunes-cove-temple.trycloudflare.com', 'dx-reductions-performances-engineers.trycloudflare.com']
    }
  },
  css: ["~/assets/app.css"],
  modules: ["@nuxt/icon"],
  icon: {
    serverBundle: {
      collections: ['uil', 'mdi']
    }
  }
})
