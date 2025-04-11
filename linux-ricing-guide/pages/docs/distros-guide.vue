<template>

  <div class="container mx-auto p-4">
    <Motion as="div" :variants="container" initial="hidden" animate="visible"
            class="grid grid-cols-1 md:grid-cols-1 gap-6 mb-10">
      <DistroChooser
          :questions="questions"
          :results="results"
          :onResultSelected="handleResultSelected"></DistroChooser>
      <Motion v-for="(section, index) in sections" :key="index" :variants="items" class="w-full">
        <GradientOutline circle-width="200px">
          <div class="card bg-base-200 text-base-content p-6 h-full">
            <section class="mb-6 h-full flex flex-col">
              <h2 class="mb-4 text-xl font-bold flex flex-row items-center">
                <DynamicIcon :names="{ default: section.icon }" class="mr-2"/>
                {{ section.title }}
              </h2>
              <p class="text-md flex-grow" v-html="section.content"></p>
            </section>
          </div>
        </GradientOutline>
      </Motion>
    </Motion>
  </div>
</template>
<script setup lang="ts">
import DistroChooser from "~/components/DistroChooser.vue";
import {Motion} from 'motion-v'

definePageMeta({
  icons: {default: 'database'},
});

const container = {
  hidden: {opacity: 0, scale: 0.95}, // Adjusted to avoid layout shift
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
  hidden: {y: 20, opacity: 0, scale: 0.85},
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
}

const sections = [
  {
  },
  {
  },
]
</script>