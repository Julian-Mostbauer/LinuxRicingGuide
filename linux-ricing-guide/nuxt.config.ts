import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
          auth0Domain: 'integr-0.eu.auth0.com',
          auth0ClientId: 'jqQ95UJyIRnhLTpci9FsyrfgqkNyrptp',
          hostDomain: 'https://example.com'
        }
      },
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
    hooks: {
        'pages:extend'(pages) {
            // read all json files from ~/server-data/histories/
            const fs = require('fs')
            const path = require('path')
            const files = fs.readdirSync(path.resolve(__dirname, 'server-data/histories'))
            const jsonFiles = files.filter((file: string) => file.endsWith('.json'))

            // push each json file to pages
            jsonFiles.forEach((file: string) => {
                const name = file.replace('.json', '')
                const jsonData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'server-data/histories', file), 'utf-8'))

                pages.push({
                    name: jsonData.name,
                    path: `/distros/history/${name}`,
                    file: '~/components/DistroHistoryTemplate.vue',
                    meta: {
                        jsonObject: jsonData,
                        icons: {
                            default: 'database',
                        }
                    }
                })
            })
        }
    }
})
