<template>
  <GradientOutline circle-width="300px" className="w-4/5 mt-4 mb-4">
    <div
      class="card h-full w-full lg:card-side bg-base-200 shadow-xl flex flex-col lg:flex-row items-center lg:items-start border border-base-300">
      <!-- Image Container -->
      <figure
        class="flex-none w-48 h-48 rounded-lg overflow-hidden m-4 lg:m-0 lg:mr-4 rounded-r-none border-r border-base-300 p-4">
        <img :src="imagePath" :alt="link" class="w-full h-full object-cover p-2" />
      </figure>

      <!-- Card Body -->
      <div class="card-body text-center lg:text-left">
        <h2 class="card-title">{{ title }}</h2>
        <p>{{ description }}</p>
        <div class="card-actions justify-center lg:justify-end">
          <a :href="link" target="_blank" class="btn btn-primary">
            <DynamicIcon :names="{'default': 'link'}" /> Visit
          </a>
        </div>
      </div>
    </div>
  </GradientOutline>
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