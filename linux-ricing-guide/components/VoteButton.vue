<template>
  <div class="flex flex-col justify-center items-center" :class="{
    'text-primary':
      data.your_vote == voteType,
    'mr-4 border-r-4':
      voteType == 'Up',
    'ml-4 border-l-4':
      voteType == 'Down',
  }">
    <p v-if="voteType == 'Up'">
      {{ data.upvote_count }}
    </p>
    <p v-else>
      {{ data.downvote_count }}
    </p>
    <svg v-if="voteType == 'Up'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
      viewBox="0 0 24 24">
      <path d="M12 4l-7 8h4v8h6v-8h4z" />
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 20l7-8h-4V4h-6v8H5z" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import type { IVoteInfo } from '~/assets/types/backendTypes';

defineProps<{
  data: IVoteInfo,
  voteType: 'Up' | 'Down',
}>()
</script>