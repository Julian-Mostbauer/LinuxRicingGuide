<template>
  <div class="card h-full w-full bg-base-200 shadow-lg">
    <figure>
      <img :src="imagePath" alt="Image" class="w-full h-48 object-cover rounded-t-lg" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ title }}</h2>
      <p>{{ description }}</p>
      <div class="card-actions justify-end">
        <NuxtLink :to="link" class="btn btn-primary text-base-200">
          <Icon :name="iconToLink('link')" />
          Visit
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { iconToLink } from '~/assets/utils/iconUtils'

defineProps<{
  imagePath: string;
  title: string;
  description: string;
  link: string;
}>();
</script>