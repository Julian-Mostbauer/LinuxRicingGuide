<template>
  <div class="card lg:card-side bg-base-200 shadow-xl w-4/5 flex flex-col lg:flex-row items-center lg:items-start mt-4 mb-4 border border-gray-800">
    <!-- Image Container -->
    <figure class="flex-none w-48 h-48 rounded-lg overflow-hidden m-4 lg:m-0 lg:mr-4 rounded-r-none border-r border-gray-800 p-4">
      <img :src="imagePath" :alt="link" class="w-full h-full object-cover p-2" />
    </figure>

    <!-- Card Body -->
    <div class="card-body text-center lg:text-left">
      <h2 class="card-title">{{ title }}</h2>
      <p>{{ description }}</p>
      <div class="card-actions justify-center lg:justify-end">
        <a :href="link" target="_blank" class="btn btn-primary">
          <i class="fa-solid fa-link"></i> Visit
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  description: string;
  link: string;
  imagePath: string;
}>();
</script>

<style></style>