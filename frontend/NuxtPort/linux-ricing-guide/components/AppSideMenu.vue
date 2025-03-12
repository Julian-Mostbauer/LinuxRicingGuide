<template>
  <div>
    <ul class="menu menu-xs bg-base-200 rounded-box max-w-xs w-full">
      <TreeNode v-if="fileTree.Root" :node="fileTree.Root" :isRoot="true" />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import {Tree, Node} from 'assets/utils/routeTree'

const router = useRouter();
const routes = router.getRoutes();

const fileTree = ref(new Tree());
routes.forEach(route => fileTree.value.add(route));
</script>
