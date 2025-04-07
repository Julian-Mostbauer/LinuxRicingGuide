<template>
  <div class="grid gap-4 md:gap-6" :style="{
    '--desktop-cols': dimensions.width,
    '--mobile-cols': mobileDimensions.width
  }">
    <div v-for="(entry, index) in entries" :key="index" @click="navigateTo(entry.link, linkPrefix)">
      <GradientOutline circle-width="200px">
        <div class="cursor-pointer bg-base-200 relative p-4 hover:bg-base-100 rounded-[var(--radius-box)]">
          <div class="p-[0.2rem]">
            <img :src="entry.imagePath" alt="Image" class="w-full h-full object-cover aspect-square" />
          </div>
        </div>
      </GradientOutline>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()

type Dimensions = { width: number; height: number };
type Entry = { imagePath: string; link: string };

defineProps<{
  entries: Entry[];
  dimensions: Dimensions;
  mobileDimensions: Dimensions;
  linkPrefix?: string;
}>();

const navigateTo = (link: string, linkPrefix?: string) => {
  router.push(linkPrefix ? `${linkPrefix}${link}` : link);
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