<template>
  <h2 class="mb-4 text-xl font-bold flex flex-row items-center">
    <DynamicIcon :names="{ default: 'comment' }" class="mr-2" />
    Post a comment
  </h2>
  <div class="flex flex-col space-y-3">
    <textarea v-model="commentContent" class="textarea textarea-bordered w-full"
      placeholder="Write your comment here..."></textarea>
    <button @click="postComment(commentPoster)" class="btn btn-primary">Post
      Comment</button>
  </div>
</template>


<script setup lang="ts" generic="TcP extends { postComment: (content: string) => Promise<boolean>; }">
const commentContent = ref('')

defineProps<{
  commentPoster: TcP;
}>()

const postComment = async (cP: TcP) => {
  if (commentContent.value.trim() === '') {
    return
  }
  await cP.postComment(commentContent.value)
  commentContent.value = ''
}
</script>
