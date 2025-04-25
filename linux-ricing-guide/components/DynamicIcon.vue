<template>
  <Icon :name="iconToLink(new Map(Object.entries(names)))" :size />
</template>

<script lang="ts" setup generic="T extends Record<string, string>, K extends keyof T">
import { iconToLink } from '~/assets/utils/iconUtils'

defineProps<{
  names: T
  size?: number
  alwaysUse?: K
}>();
</script>