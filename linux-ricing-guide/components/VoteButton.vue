<template>
  <div class="flex flex-col justify-center items-center btn h-full text-xs p-3" :class="{
    'text-primary':
      data.your_vote == voteType,
    'btn-soft text-primary':
        data.your_vote == voteType,
    'btn-soft':
        data.your_vote != voteType,
    'mr-4':
        voteType == 'Up',
    'ml-4':
        voteType == 'Down',
  }">
    <p v-if="voteType == 'Up'">
      {{ data.upvote_count }}
    </p>
    <p v-else>
      {{ data.downvote_count }}
    </p>
      <DynamicIcon v-if="voteType == 'Up'" :names="{default: 'thumbs-up'}" :size="20"/>
      <DynamicIcon v-else :names="{default: 'thumbs-down'}" :size="20"/>
  </div>
</template>

<script setup lang="ts">
import type { IVoteInfo } from '~/assets/types/backendTypes';

defineProps<{
  data: IVoteInfo,
  voteType: 'Up' | 'Down',
}>()
</script>