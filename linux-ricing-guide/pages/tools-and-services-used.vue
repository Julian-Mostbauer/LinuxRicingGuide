<script setup lang="ts">
definePageMeta({
    icons: {
        default: 'screwdriver-wrench',
    }
});
</script>

<template>
    <div class="bg-base-300 p-20">
        <div class="text-left">
            <div class="max-w-md">
                <h1 class="text-5xl font-bold">Tools and Services</h1>
                <p class="pt-6">
                    This page lists the tools and services used in the development of this website.
                    It includes both the tools used for development and the services used for hosting and deployment.
                </p>
                <h2 class="text-3xl font-bold pt-6">Development Tools</h2>
                <ul class="list-disc pl-6 pt-6">
                    <li>Visual Studio Code - Code editor</li>
                    <li>WebStorm - Code editor</li>
                    <li>Node.js - JavaScript runtime</li>
                    <li>Nuxt.js - Framework for building Vue.js applications</li>
                    <li>Vue.js - The JavaScript framework</li>
                    <li>TypeScript - Superset of JavaScript for static typing</li>
                    <li>Tailwind CSS - Utility-first CSS framework</li>
                    <li>Git - Version control system</li>
                    <li>GitHub - Code hosting platform</li>
                    <li>Rust - Backend server</li>
                    <li>DaisyUI - Frontend UI Framework</li>
                    <li>Auth0 - Authorization and Authentication</li>
                </ul>

                <h2 class="text-3xl font-bold pt-6">Hosting and Deployment Services</h2>
                <ul class="list-disc pl-6 pt-6">
                    <li>GitHub Actions - CI/CD for automated deployments</li>
                    <li>GitHub Pages - Hosting platform for static sites</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>