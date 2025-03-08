<template>
  <div class="grid gap-4 md:gap-6" :style="{
    '--desktop-cols': config.dimensions.width,
    '--mobile-cols': config.mobileDimensions.width
  }">
    <div v-for="(entry, index) in config.entries" :key="index"
      class="border-2 border-base-300 rounded-box p-4 bg-base-100 hover:bg-base-200 transition-all duration-300 cursor-pointer overflow-hidden"
      @click="navigateTo(entry.link, config.linkPrefix)">
      <img :src="entry.imagePath" alt="Image" class="w-full h-full object-cover rounded-box" />
    </div>
  </div>
</template>

<script lang="ts" setup>
type Dimensions = { width: number; height: number };
type Entry = { imagePath: string; link: string };

type ConfigProps = {
  entries: Entry[];
  dimensions: Dimensions;
  mobileDimensions: Dimensions;
  linkPrefix?: string;
};

defineProps<{ config: ConfigProps }>();

const navigateTo = (link: string, linkPrefix?: string) => {
  window.location.href = linkPrefix ? `${linkPrefix}${link}` : link;
};
</script>

<style scoped>
.grid {
  grid-template-columns: repeat(var(--desktop-cols, 3), minmax(0, 1fr));
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(var(--mobile-cols, 2), minmax(0, 1fr));
  }
}
</style>