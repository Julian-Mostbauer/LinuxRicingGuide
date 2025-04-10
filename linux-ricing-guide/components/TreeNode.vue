<template>
  <ul v-if="!isRoot || node.Children.length > 0" ref="treeRef"
    :class="isRoot ? 'menu rounded-r-[1.5rem] mt-2 mb-2 bg-base-200 text-base-content min-h-[98%] w-80 border-r-2 border-t-2 border-b-2 border-base-300' : ''">

    <!-- Index of Directory -->
    <li v-if="node.HasIndex"
      :class="{ 'opacity-0': !isVisible, 'animate-fade-in': isVisible, 'text-primary': isActivePage(node) }"
      :style="{ animationDelay: animationDelay(0) }">
      <NuxtLink :to="node.Value?.path || '/'" @click="closeNav">
        <DynamicIcon :names="{
          default: (isRoot ? 'house' : 'circle-info'),
          mdi: (isRoot ? 'home' : 'information-slab-circle')
        }" :size="iconSize" class="min-w-6" />
        {{ isRoot ? "Home" : "Overview" }}
      </NuxtLink>
    </li>

    <li v-for="(child, index) in node.Children" :key="child.Value?.path"
      :class="{ 'opacity-0': !isVisible, 'animate-fade-in': isVisible }"
      :style="{ animationDelay: animationDelay(index) }">

      <!-- Directories -->
      <details v-if="child.Children.length > 0" open>
        <summary>
          <DynamicIcon :names="routeIcon(child.Value)" :size="iconSize" class="min-w-6" />
          {{ routeName(child.Value?.path) }}
        </summary>
        <TreeNode :node="child" />
      </details>

      <!-- Normal Files -->
      <NuxtLink v-else :to="child.Value?.path || '/'" @click="closeNav"
        :class="{ 'text-primary': isActivePage(child) }">
        <DynamicIcon :names="routeIcon(child.Value)" :size="iconSize" class="min-w-6" />
        {{ routeName(child.Value?.path) }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { PropType } from 'vue';
import { Node, routeName, routeIcon } from 'assets/utils/routeTree'
import { useRoute } from 'vue-router';

const route = useRoute();
const isActivePage = (r: Node) => route.fullPath == r.Value?.path;

const iconSize: number = 20;
const isVisible = ref(false);
const treeRef = ref<HTMLElement | null>(null);

const closeNav = () => {
  if (document) {
    const navCheckbox = document.getElementById('nav-drawer');
    if (navCheckbox) {
      (navCheckbox as HTMLInputElement).checked = false;
    }
  }
};

const initialDelay = 100;
const indivitualDelay = 60;
const animationDelay = (index: number) => `${initialDelay + index * indivitualDelay}ms`;

defineProps({
  node: {
    type: Object as PropType<Node>,
    required: true,
  },
  isRoot: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  if (treeRef.value) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(treeRef.value);
  }
});
</script>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}
</style>
