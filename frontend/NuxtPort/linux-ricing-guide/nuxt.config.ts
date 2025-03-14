import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    $development: undefined,
    $env: undefined,
    $meta: undefined,
    $production: undefined,
    $test: undefined,
    compatibilityDate: '2024-11-01',
    devtools: { enabled: false },
    vite: {
        plugins: [tailwindcss()],
        server: {
            allowedHosts: [
                'localhost',
                'among-ts-persian-mixed.trycloudflare.com',
                'warren-itunes-cove-temple.trycloudflare.com',
                'dx-reductions-performances-engineers.trycloudflare.com',
            ],
        },
    },
    css: ['~/assets/app.css'],
    modules: ['@nuxt/icon', 'motion-v/nuxt'],
    icon: {
        serverBundle: {
            collections: ['uil', 'mdi'],
        },
    },
})
