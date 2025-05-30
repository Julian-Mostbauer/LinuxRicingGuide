<template>
  <ul v-if="!isRoot || node.Children.length > 0" ref="treeRef">
    <!-- Index File -->
    <li v-if="node.HasIndex" :class="animationClass" :style="animationStyle(0)">
      <NuxtLink :to="node.Value?.path || '/'" @click="closeNav" :class="{ 'text-primary': isActivePage(node) }">
        <DynamicIcon :names="indexIcons" :size="iconSize" class="min-w-6" />
        {{ isRoot ? "Home" : "Overview" }}
      </NuxtLink>
    </li>

    <!-- Child Items -->
    <li v-for="(child, index) in node.Children" :key="child.Value?.path" :class="animationClass"
      :style="animationStyle(index)">
      <details v-if="child.Children.length > 0" open>
        <summary>
          <DynamicIcon :names="routeIcon(child.Value)" :size="iconSize" class="min-w-6" />
          {{ routeName(child.Value?.path) }}
        </summary>
        <DrawerNode :node="child" />
      </details>

      <NuxtLink v-else :to="child.Value?.path || '/'" @click="closeNav"
        :class="{ 'text-primary': isActivePage(child) }">
        <DynamicIcon :names="routeIcon(child.Value)" :size="iconSize" class="min-w-6" />
        {{ routeName(child.Value?.path) }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import type { PropType } from 'vue';
import { Node, routeName, routeIcon } from 'assets/utils/routeTree';
import { useRoute } from 'vue-router';
import { isSpecialDay } from 'assets/utils/dateUtils';

const props = defineProps({
  node: { type: Object as PropType<Node>, required: true },
  isRoot: { type: Boolean, default: false }
});

const route = useRoute();

const iconSize = 20;
const isVisible = ref(false);
const treeRef = ref<HTMLElement | null>(null);

const indexIcons = computed(() => ({
  default: props.isRoot ? 'house' : 'circle-info',
  mdi: props.isRoot ? 'home' : 'information-slab-circle'
}));

const isActivePage = (r: Node) => route.fullPath === r.Value?.path;

const closeNav = () => {
  const navCheckbox = document.getElementById('nav-drawer') as HTMLInputElement | null;
  if (navCheckbox) {
    (navCheckbox.checked = false);
  }
};


// <Animations>
if (import.meta.client) {
  document.documentElement.style.setProperty('--fade-in-duration',
    (isSpecialDay || Math.random() < (1 / 100)
      ? '3s' : '0s'));
}

const animationClass = computed(() => ({
  'opacity-0': !isVisible.value,
  'animate-fade-in': isVisible.value
}));

const animationStyle = (index: number) =>
  ({ animationDelay: `${100 + index * 100}ms` });
// </Animations>

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => entry?.isIntersecting && (isVisible.value = true),
    { threshold: 0.1 }
  );
  treeRef.value && observer.observe(treeRef.value);
});
</script>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-5px);
    color: rebeccapurple;
    transform: rotate3d(5, 23, 5, 1000deg);
  }

  10% {
    color: red;
  }

  20% {
    color: orange;
  }

  30% {
    color: yellow;
  }

  40% {
    color: green;
  }

  50% {
    color: cyan;
  }

  60% {
    color: blue;
  }

  70% {
    color: indigo;
  }

  80% {
    color: violet;
  }

  90% {
    color: pink;
  }

  to {
    opacity: 1;
    transform: translateY(0);
    color: inherit;
    transform: rotate3d(0, 0, 0, 0);
  }
}

.animate-fade-in {
  animation: fade-in var(--fade-in-duration) ease-out forwards;
}
</style>