<script setup lang="ts">
interface Section {
  title: string;
  text: string;
}

interface History {
  name: string;
  description: string;
  sections: Section[];
}

const route = useRoute()
const meta = route.meta;
const jsonObject = meta.jsonObject as History;
</script>

<template>
  <div>
    <h1>{{ jsonObject.name }}</h1>
  </div>
</template>

<style scoped>
</style>