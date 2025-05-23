<template>
  <div
    class="fixed z-100 bottom-4 right-4 transform bg-base-200 p-4 rounded-xl flex items-center outline-error outline-2 hover:cursor-pointer hover:bg-base-100"
    v-if="!healthy" @click="() => { showWarn() }">
    <div class="inline-grid *:[grid-area:1/1] mr-2">
      <div class="status status-error animate-ping"></div>
      <div class="status status-error"></div>
    </div>
    <p class="text-error text-xl">Disconnected</p>

  </div>
  <dialog id="health_warn" class="modal">
    <div class="modal-box outline-error outline-2">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <div class="flex items-center text-error">
        <div class="inline-grid *:[grid-area:1/1] mr-2">
          <DynamicIcon :names="{ 'default': 'triangle-exclamation' }" :size="22" class="mr-2 animate-ping" />
          <DynamicIcon :names="{ 'default': 'triangle-exclamation' }" :size="22" class="mr-2" />
        </div>
        <h3 class="text-lg font-bold">Warning!</h3>
      </div>

      <p class="py-4">No connection to the backend server could be established. Please note that some parts and some
        functionality of the website may be unavailable at this time.</p>

    </div>

  </dialog>
  <div class="background overflow-clip">
    <AppNavbar />
    <div ref="content">
      <slot />
        <footer class="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
            <aside>
                <DynamicIcon :names="{default: 'book'}" :size="60" class="mb-2"/>
                <p>
                    <strong>Linux Ricing Guide</strong>
                    <br />
                    Your one-stop resource for all things Linux ricing.
                </p>
            </aside>
            <nav>
                <h6 class="footer-title">Credits</h6>
                <NuxtLink to="/about-this-page" class="link link-hover">About this page</NuxtLink>
                <NuxtLink to="/tools-and-services-used"  class="link link-hover">Tools and Services used</NuxtLink>
            </nav>
            <nav>
                <h6 class="footer-title">Our Team</h6>
                <NuxtLink to="/about-us"  class="link link-hover">About us</NuxtLink>
                <NuxtLink to="/contributions"  class="link link-hover">Contributions</NuxtLink>
            </nav>
        </footer>
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
import { onMounted } from 'vue'
import IntervalManager from "~/assets/utils/intervalManager";

const healthy = ref(false);

const fetchHealth = async () => {
  try {
    const res = await $fetch("/api/backendHealth");
    healthy.value = res.healthy;
    window.localStorage.setItem("backendHealth", JSON.stringify(res.healthy));
  } catch {
    healthy.value = false;
  }
};

// @ts-ignore // ignore undefined value for health_warn
const showWarn = () => health_warn.showModal();

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

let intervalManager = new IntervalManager();
onMounted(() => {
  intervalManager.start(fetchHealth, 10000);
  watch(route, updateRouteParts, { immediate: true });

  const keywordParam = route.query.q
  const keyword = typeof keywordParam === 'string' ? keywordParam.trim() : ''

  if (keyword && content.value) {
    highlightText(content.value, keyword)
  }
})

onUnmounted(() => {
  intervalManager.stop();
});

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