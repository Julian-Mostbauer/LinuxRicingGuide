<template>
  <div>
    <Icon :name="iconToLink(name, provider)" />
  </div>
</template>

<script lang="ts" setup>
  import { iconToLink } from '~/assets/utils/iconUtils'
  defineProps<{
    name: string
    provider?: string
  }>();
</script>