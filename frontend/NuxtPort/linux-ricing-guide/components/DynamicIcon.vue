<template>
  <Icon :name="iconToLink(defaultName, provider, providerSpecificNames)" :size />
</template>

<script lang="ts" setup>
import { iconToLink } from '~/assets/utils/iconUtils'

const props = defineProps<{
  defaultName: string
  providerSpecificNames?: { provider: string, name: string }[]
  size?: number
  provider?: string
}>();
</script>