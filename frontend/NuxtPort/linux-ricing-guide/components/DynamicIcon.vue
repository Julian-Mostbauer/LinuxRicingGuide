<template>
  <Icon :name="iconToLink(new Map(Object.entries(names)))" :size />
</template>

<script lang="ts" setup>
import { iconToLink } from '~/assets/utils/iconUtils'

defineProps<{
  names: {}
  size?: number
}>();
</script>