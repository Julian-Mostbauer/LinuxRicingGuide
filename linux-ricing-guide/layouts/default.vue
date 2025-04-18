<template>
  <div class="background overflow-clip">
    <AppNavbar />
    <div ref="content">
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

import { onMounted } from 'vue'

const content = ref<HTMLElement | null>(null)

function highlightText(node: Node, word: string): void {
  if (!word) return
  const regex = new RegExp(`(${escapeRegExp(word)})`, 'gi')

  if (node.nodeType === Node.TEXT_NODE && node.textContent) {
    if (regex.test(node.textContent)) {
      const spanWrapper = document.createElement('span')
      spanWrapper.innerHTML = node.textContent.replace(
          regex,
          '<span class="bg-accent">$1</span>'
      )

      const parent = node.parentNode
      if (parent) {
        parent.replaceChild(spanWrapper, node)
      }
    }
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    const childNodes = Array.from(node.childNodes)
    for (const child of childNodes) {
      highlightText(child, word)
    }
  }
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
const updateRouteParts = () => {
  document.title = toHeaderCase((route.name === "index" ? "home" : route.name!).toString())
};

onMounted(() => {
  watch(route, updateRouteParts, { immediate: true });

  const keywordParam = route.query.q
  const keyword = typeof keywordParam === 'string' ? keywordParam.trim() : ''

  if (keyword && content.value) {
    highlightText(content.value, keyword)
  }
})
watch(
    () => route.query.q,
    async (q) => {
      const keyword = typeof q === 'string' ? q.trim() : ''
      if (content.value && keyword) {
        // Wait until slot content is rendered
        await nextTick()
        highlightText(content.value, keyword)
      }
    },
    { immediate: true }
)
</script>