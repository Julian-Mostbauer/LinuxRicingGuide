<template>
  <div class="gridClass w-full">
    <div
      v-for="(entry, index) in entries"
      :key="index"
      class="cursor-pointer overflow-hidden"
      @click="navigateTo(entry.link)"
    >
      <img :src="entry.imagePath" alt="Image" class="w-full h-full object-cover" />
    </div>
  </div>
</template>

<script lang="ts" setup>
type Dimensions = { width: number; height: number };
type Entry = { imagePath: string; link: string };

defineProps<{ entries: Entry[]; dimensions: Dimensions; mobileDimensions: Dimensions }>();

const navigateTo = (link: string) => {
  window.location.href = link;
};
</script>

<style scoped>
.w-full {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  grid-template-rows: repeat(var(--rows), 1fr);
  gap: 4px;
}
@media (min-width: 640px) {
  .w-full {
    --columns: v-bind(dimensions.width);
    --rows: v-bind(dimensions.height);
  }
}
@media (max-width: 639px) {
  .w-full {
    --columns: v-bind(mobileDimensions.width);
    --rows: v-bind(mobileDimensions.height);
  }
}
</style>
