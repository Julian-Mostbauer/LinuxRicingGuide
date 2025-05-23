<template>
  <div v-if="
    comments.length > 0
  " class="mt-2 space-y-3">
    <div v-for="(comment, idx) in comments" :key="idx" class="p-3 rounded-xl bg-base-100 min-w-full content-center items-center flex flex-row">
      <div>
        <VoteButton vote-type="Up" :data="comment"
          @click="commentHandler.upvoteComment(comment.id, (res) => updateComment(comments, idx, res.data))" />
      </div>
      <div class="flex-grow">
        <div class="text-xs text-base-content font-medium mb-1">
          {{ comment.date }}
        </div>
        <div class="text-base-content text-md">
          {{ comment.content }}
        </div>
      </div>
      <div class="flex content-center items-center cursor-pointer btn btn-soft btn-error h- p-3"
        @click="commentHandler.deleteComment(comment.id, (res) => { deleteComment(comments, idx) })">
        <DynamicIcon :names="{ default: 'trash-can' }" :size="19" />
      </div>
      <div>
        <VoteButton vote-type="Down" :data="comment"
          @click="commentHandler.downvoteComment(comment.id, (res) => updateComment(comments, idx, res.data))" />
      </div>
    </div>
  </div>
  <div v-else class="mt-2 text-base-content/60 text-sm">
    No comments yet.
  </div>
</template>

<script setup lang="ts">
import type { CommentWithParsedDate } from '~/assets/types/backendTypes'
import type { ICommentVoter, ICommentDeleter } from '~/assets/utils/backendUtils';

defineProps<{
  comments: CommentWithParsedDate[],
  commentHandler: ICommentVoter & ICommentDeleter
}>()

const updateComment = (comments: CommentWithParsedDate[], idx: number, data: Comment) => {
  //@ts-ignore
  comments[idx] = { ...data, date: comments[idx].date }
}

const deleteComment = (comments: CommentWithParsedDate[], idx: number) => {
  comments = comments.splice(idx, 1);
}

</script>