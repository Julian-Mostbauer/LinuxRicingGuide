<template>
  <div class="card w-full bg-base-200">
    <figure>
      <img :src="imagePath" alt="Image" class="w-full h-48 object-cover rounded-lg" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ title }}</h2>
      <p>{{ description }}</p>
      <div class="card-actions justify-end mb-0">
        <a :href="link" class="btn btn-primary">Visit</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/*
  <div class="card w-80 bg-base-200">
  <div class="card-body gap-3">
    <input placeholder="Email" class="input" />
    <label class="label">
      <input type="checkbox" class="toggle toggle-sm" />
      Submit to newsletter
    </label>
    <label class="label">
      <input type="checkbox" class="toggle toggle-sm" />
      Accept terms of use
    </label>
    <button class="btn btn-neutral">Save</button>
  </div>
</div>
*/
defineProps<{
  imagePath: string;
  title: string;
  description: string;
  link: string;
}>();
</script>