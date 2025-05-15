<template>
  <div v-if="
    comments.length > 0
  " class="mt-2 space-y-3">
    <div v-for="(comment, idx) in comments" :key="idx" class="p-3 rounded bg-base-100 border">
      <div class="text-sm text-base-content font-medium mb-1">
        {{ comment.date }}
      </div>
      <div class="text-base-content text-sm">
        {{ comment.content }}
      </div>
    </div>
  </div>
  <div v-else class="mt-2 text-base-content/60 text-sm">
    No comments yet.
  </div>
</template>

<script setup lang="ts">
import type { CommentWithParsedDate } from '~/assets/types/backendTypes'

defineProps<{
  comments: CommentWithParsedDate[]
}>()
</script>