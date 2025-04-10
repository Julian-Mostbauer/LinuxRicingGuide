<script setup lang="ts">
import { useMouse } from "@vueuse/core";

const { x, y } = useMouse();
const el = ref<HTMLElement | null>(null);

defineProps<{
  circleWidth: string;
  className?: string;
}>();
</script>

<template>
  <div :class="`${className} card entry relative p-[0.2rem] bg-transparent h-full`" :style="{
    '--x': `${x - (el?.offsetLeft ?? 0)}px`,
    '--y': `${y - (el?.offsetTop ?? 0)}px`,
    '--border-radius': 'calc(var(--radius-box)*1.08)',
    '--circle-width': circleWidth,
  }" ref="el">
    <slot />
  </div>
</template>

<style scoped>
.entry {
  border-radius: var(--border-radius);
}

.entry::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--border-radius);
  background: radial-gradient(var(--circle-width) circle at var(--x) var(--y),
      var(--color-primary),
      transparent);
}
</style>