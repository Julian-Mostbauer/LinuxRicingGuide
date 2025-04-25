<template>
  <div class="mockup-code w-full mt-6">
    <pre data-prefix="$"><code>{{command}}</code></pre>
    <button
        v-if="copy"
        @click="copyCommand"
        class="absolute top-2 right-2 bg-base-700 hover:bg-base-600 text-xs text-base px-2 py-1 rounded hover:cursor-pointer"
    >
      <DynamicIcon :names="{ default: 'copy' }" class="mr-2"/>

      {{ copied ? "Copied!" : "Copy" }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  command: {
    type: String,
    required: true
  },
  copy: {
    type: Boolean,
    default: true
  }
})

const copied = ref(false)

const copyCommand = async () => {
  try {
    await navigator.clipboard.writeText(props.command)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch (err) {
    console.error("Copy failed", err)
  }
}
</script>

<style scoped>
pre {
  line-height: 1.4;
  font-size: 0.9rem;
}
</style>
