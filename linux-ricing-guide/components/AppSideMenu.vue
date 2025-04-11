<template>
    <div
        class="menu rounded-r-[1.5rem] mt-2 mb-2 bg-base-200 text-base-content min-h-[98%] w-80 border-2 border-l-0 border-base-300 overflow-hidden">
        <TreeNode v-if="fileTree.Root" :node="fileTree.Root" :isRoot="true" />
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { Tree } from 'assets/utils/routeTree'

const router = useRouter();
const routes = router.getRoutes();

const fileTree = ref(new Tree());
routes.forEach(route => fileTree.value.add(route));
</script>
