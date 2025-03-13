<template>
    <TreeNode v-if="fileTree.Root" :node="fileTree.Root" :isRoot="true" />
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { Tree } from 'assets/utils/routeTree'

const router = useRouter();
const routes = router.getRoutes();

const fileTree = ref(new Tree());
routes.forEach(route => fileTree.value.add(route));

console.log(fileTree.value)
</script>
