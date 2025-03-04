<template>
  <div class="w-full mt-4 h-[calc(100%-1.5rem)]">
    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
      <img :src="imagePath" class="w-full h-60 object-cover" alt="..." />
      <div class="p-4 text-left">
        <h5 class="text-xl font-bold">{{ title }}</h5>
        <p class="text-gray-700 mt-2">
          {{ description }}
        </p>
      </div>
      <div class="p-4 text-center">
        <a :href="link"
          class="btn btn-primary w-full inline-block py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          <i class="fa-solid fa-link"></i> Visit
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  imagePath: string;
  title: string;
  description: string;
  link: string;
}>();
</script>