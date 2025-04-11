<template>
  <div class="background overflow-clip">
    <AppNavbar />
    <div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.background {
  min-height: 100vh;
  background-color: var(--bg-base-200);
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='-10 -10 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23939393' fill-opacity='0.16'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>

<script setup lang="ts">
import { useRoute } from "#vue-router";
import { ref, watch } from "vue";
import { toHeaderCase } from "assets/utils/caseUtils";
import { createAuth0 } from "@auth0/auth0-vue";

const route = useRoute()

onMounted(() => {
  watch(route, updateRouteParts, { immediate: true });
})

const updateRouteParts = () => {
  document.title = toHeaderCase((route.name === "index" ? "home" : route.name!).toString())
};

const config = useRuntimeConfig();
const nxt = useNuxtApp()
nxt.vueApp.use(
  createAuth0({
    domain: config.public.auth0Domain,
    clientId: config.public.auth0ClientId,
    authorizationParams: {
      redirect_uri: import.meta.dev
        ? 'http://localhost:3000' // Development
        : config.public.hostDomain, // Production,
      scope: 'openid profile email',
    },
  })
);

</script>