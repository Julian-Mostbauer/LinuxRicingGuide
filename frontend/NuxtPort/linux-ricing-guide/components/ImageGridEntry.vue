<script setup lang="ts">
import {useMouse} from "@vueuse/core";

const { x, y } = useMouse();
const el = ref<HTMLElement | null>(null);
</script>

<template>
<div
  class="entry relative p-[0.2rem] bg-base-300 cursor-pointer hover:bg-primary"
  :style="{
      '--x': `${x - (el?.offsetLeft ?? 0)}px`,
      '--y': `${y - (el?.offsetTop ?? 0)}px`
    }"
  ref="el"
>
  <div class="bg-base-200 relative p-4 rounded-[0.8rem] hover:bg-base-100">
    <slot />
  </div>
</div>
</template>

<style scoped>
.entry {
  border-radius: 1rem;
}

.entry::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  background: radial-gradient(
      200px circle at var(--x) var(--y),
      var(--color-primary),
      transparent
  );
}
</style>