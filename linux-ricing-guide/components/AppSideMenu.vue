<template>
  <div class="menu rounded-r-box mt-2 mb-2 bg-base-200 text-base-content min-h-[98%] w-96 overflow-hidden">
    <div class="flex justify-end p-2">
      <button @click="toggleNavMode" class="btn btn-primary">Switch Mode</button>
    </div>
    <div v-if="navMode === 'drawer'">
      <DrawerNode v-if="fileTree.Root" :node="fileTree.Root" :isRoot="true" />
    </div>
    <div v-if="navMode === 'graph'">
      <GraphNode v-if="fileTree.Root" :node="fileTree.Root" :isRoot="true" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { TreeBuilder } from 'assets/utils/routeTree';

const fileTree = ref(TreeBuilder.FromRoutes(useRouter().getRoutes()));

const modes = ['drawer', 'graph'];
const navMode = ref(modes[0]);
const currentModeIdx = ref(0);

if (typeof window !== 'undefined') {
  navMode.value = localStorage.getItem('navMode') || modes[0];
  currentModeIdx.value = modes.indexOf(navMode.value);
}

const toggleNavMode = () => {
  navMode.value = modes[(currentModeIdx.value + 1) % modes.length];
  currentModeIdx.value = (currentModeIdx.value + 1) % modes.length;
  localStorage.setItem('navMode', navMode.value);
};
</script>
