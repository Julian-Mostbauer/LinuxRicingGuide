<template>
  <ClientOnly>
    <div 
      class="menu rounded-r-box mt-2 mb-2 bg-base-200 text-base-content min-h-[98%] overflow-hidden w-96 min-w-fit">
      <div class="flex p-2 justify-between">
        <button @click="closeNav" class="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button @click="toggleNavMode" class="btn btn-primary">
          {{ navMode }}
        </button>
      </div>
      <div v-if="navMode === 'drawer'">
        <DrawerNode v-if="fileTree.Root" :node="fileTree.Root" :isRoot="true" />
      </div>
      <div v-if="navMode === 'graph'">
        <GraphNode :root-node="fileTree.Root" />
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { TreeBuilder } from 'assets/utils/routeTree'

const fileTree = ref(TreeBuilder.FromRoutes(useRouter().getRoutes()))

const modes = ['drawer', 'graph']
const navMode = ref(modes[0])
const currentModeIdx = ref(0)

if (typeof window !== 'undefined') {
  navMode.value = localStorage.getItem('navMode') || modes[0]
  currentModeIdx.value = modes.indexOf(navMode.value)
}

const toggleNavMode = () => {
  navMode.value = modes[(currentModeIdx.value + 1) % modes.length]
  currentModeIdx.value = (currentModeIdx.value + 1) % modes.length
  localStorage.setItem('navMode', navMode.value)
}

const closeNav = () => {
  const navCheckbox = document.getElementById('nav-drawer') as HTMLInputElement | null;
  if (navCheckbox) {
    (navCheckbox.checked = false);
  }
};
</script>
