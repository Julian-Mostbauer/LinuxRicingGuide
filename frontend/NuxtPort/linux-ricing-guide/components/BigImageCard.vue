<template>
  <div class="card w-full bg-base-200 shadow-lg">
    <figure>
      <img :src="imagePath" alt="Image" class="w-full h-48 object-cover rounded-t-lg" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ title }}</h2>
      <p>{{ description }}</p>
      <div class="card-actions justify-end">
        <a :href="link" class="btn btn-primary">Visit</a>
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