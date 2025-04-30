<template>
  <div class="card bg-base-200 text-base-content p-6 h-full">
    <section class="mb-6 h-full flex flex-col">
      <h2 class="mb-4 text-xl font-bold flex flex-row items-center">
        <DynamicIcon :names="icons" class="mr-2" />
        {{ title }}
      </h2>

      <slot />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
defineProps<{
  icons: {};
  title: string;
}>()
</script>