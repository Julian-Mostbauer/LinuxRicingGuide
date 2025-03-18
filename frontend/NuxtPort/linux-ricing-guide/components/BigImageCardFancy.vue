<template>
  <Motion :initial="{ scale: 0 }" :while-in-view="{ scale: 1 }" :in-view-options="{ once: true }"
    :transition="{ type: 'spring', stiffness: 250, damping: 20, delay: 0.25 }">
    <GradientOutline circle-width="300px">
      <BigImageCard :imagePath="imagePath" :title="title" :description="description" :link="link">
      </BigImageCard>
    </GradientOutline>
  </Motion>
</template>

<script setup lang="ts">
defineProps<{
  imagePath: string;
  title: string;
  description: string;
  link: string;
}>();
</script>