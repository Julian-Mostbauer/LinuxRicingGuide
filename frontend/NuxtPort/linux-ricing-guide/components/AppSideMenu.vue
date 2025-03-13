<template>
  <div>
    <TreeNode :node="fileTree.Root" :isRoot="true" />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { Tree, Node } from 'assets/utils/routeTree'

const router = useRouter();
const routes = router.getRoutes();

const fileTree = ref(new Tree());
routes.forEach(route => fileTree.value.add(route));

console.log(fileTree.value)
</script>
