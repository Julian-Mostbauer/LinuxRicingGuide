<template>
  <div class="menu rounded-r-box mt-2 mb-2 bg-base-200 text-base-content min-h-[98%] w-96 overflow-hidden">
    <DrawerNode v-if="fileTree.Root" :node="fileTree.Root" :isRoot="true" />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { Tree } from 'assets/utils/routeTree'

const routes = useRouter().getRoutes();

const fileTree = ref(new Tree());
routes.forEach(route => fileTree.value.add(route));
</script>
