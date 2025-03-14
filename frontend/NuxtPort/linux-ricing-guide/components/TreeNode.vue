<template>
  <ul v-if="!isRoot || node.Children.length > 0" ref="treeRef"
    :class="isRoot ? 'menu rounded-r-[1.5rem] mt-2 mb-2 bg-base-200 text-base-content min-h-[98%] w-80 border-r-2 border-t-2 border-b-2 border-gray-800' : ''">
    <li v-if="node.HasIndex" :class="{ 'opacity-0': !isVisible, 'animate-fade-in': isVisible }"
      :style="{ animationDelay: animationDelay(0) }">
      <a :href="node.Value?.path || '/'">
        <Icon :name="'fa6-solid:' + (isRoot ? 'house' : routeIcon(node.Value))" :size="iconSize" class="min-w-6" />
        {{ routeName(node.Value?.path, isRoot ? "Home" : "Unknown Location") }}
      </a>
    </li>

    <!-- Folders -->
    <li v-for="(child, index) in node.Children" :key="child.Value?.path"
      :class="{ 'opacity-0': !isVisible, 'animate-fade-in': isVisible }"
      :style="{ animationDelay: animationDelay(index) }">
      <details v-if="child.Children.length > 0" open>
        <summary>
          <Icon name="fa6-solid:folder" :size="iconSize" class="min-w-6" />
          {{ routeName(child.Value?.path) }}
        </summary>
        <TreeNode :node="child" />
      </details>

      <a v-else :href="child.Value?.path || '/'">
        <Icon :name="'fa6-solid:' + routeIcon(child.Value)" :size="iconSize" class="min-w-6" />
        {{ routeName(child.Value?.path) }}
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { PropType } from 'vue';
import { Node, routeName, routeIcon } from 'assets/utils/routeTree'

const iconSize: number = 20;
const isVisible = ref(false);
const treeRef = ref<HTMLElement | null>(null);

const initialDelay = 200;
const animationDelay = (index: number) => `${initialDelay + index * 100}ms`;

const props = defineProps({
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
          observer.disconnect(); // Stop observing after first appearance
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
