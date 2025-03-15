<template>
  <Motion as="div" :variants="container" initial="hidden" animate="visible" class="flex flex-col items-center">
    <Motion v-for="(cardContent, index) in cardContents" :key="index" :variants="items"
      class="w-full flex flex-col items-center">
      <SmallImageCard :title="cardContent.title" :description="cardContent.description" :link="cardContent.link"
        :imagePath="cardContent.imagePath" />
    </Motion>
  </Motion>
</template>

<script setup lang="ts">
defineProps<{
  cardContents: {
    title: string;
    description: string;
    link: string;
    imagePath: string;
  }[]
}>();

const container = {
  hidden: { opacity: 0, scale: 0.95 }, // Adjusted to avoid layout shift
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      delayChildren: 0.3, // Slightly reduced delay for smoother animation
      staggerChildren: 0.2,
    },
  },
}

const items = {
  hidden: { y: 20, opacity: 0, scale: 0.85 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
}
</script>