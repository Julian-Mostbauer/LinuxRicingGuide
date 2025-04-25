<template>
  <ClientOnly>
    <div class="menu rounded-r-box mt-2 mb-2 bg-base-200 text-base-content min-h-[98%] overflow-hidden min-w-fit">
      <div class="flex p-2 justify-between">
        <button @click="toggleNavMode" class="btn btn-circle">
          <DynamicIcon :names="{ default: 'diagram-project' }" v-if="navMode === 'Graph'"/>
          <DynamicIcon :names="{ default: 'list-ul' }" v-else />
        </button>
        <button @click="closeNav" class="btn btn-circle">
          <DynamicIcon :names="{ default: 'xmark' }" />
        </button>
      </div>
      <hr class="border-t border-base-100 my-2 w-[90%] ml-auto mr-auto">

      <div v-if="navMode === 'Drawer'">
        <DrawerNode v-if="fileTree.Root" :node="fileTree.Root" :isRoot="true" />
      </div>
      <div v-if="navMode === 'Graph'">
        <GraphNode :root-node="fileTree.Root" :width="calculateGraphWidth()" :height="calculateGraphHeight()"/>
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { TreeBuilder } from 'assets/utils/routeTree'

const fileTree = ref(TreeBuilder.FromRoutes(useRouter().getRoutes()))

const modes = ['Drawer', 'Graph']
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

const calculateGraphHeight = () => {
  const windowHeight = window.innerHeight;
  return windowHeight - 150; // Adjust for margins

};

const calculateGraphWidth = () => {
  const windowWidth = window.innerWidth;
  return windowWidth / 2; // Adjust for margins
};

</script>
