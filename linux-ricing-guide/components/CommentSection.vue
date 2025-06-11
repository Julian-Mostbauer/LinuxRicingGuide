<template>
  <div>
    <h2 class="mb-4 text-xl font-bold flex flex-row items-center mt-8">
      <DynamicIcon :names="{ default: 'comment' }" class="mr-2" />
      Post a comment
    </h2>
    <div class="flex flex-row space-x-3 h-full">
      <textarea v-model="commentContent" class="textarea textarea-bordered w-full h-full resize-none"
        placeholder="Write your comment here..."></textarea>
      <button @click="postComment(commentHandler, comments)" class="btn btn-primary h-auto">
        <DynamicIcon :names="{ default: 'paper-plane' }" :size="18" />
      </button>
    </div>
  </div>
  <details class="mt-8">
    <summary class="cursor-pointer text-lg font-semibold">
      <span class="inline-flex content-center items-center">
        Comments
        <span class="badge badge-soft ml-2">{{ comments?.length ?? 0 }}</span>
      </span>
    </summary>
    <div v-if="
      comments.length > 0
    " class="mt-2 space-y-3">
      <div v-for="(comment, idx) in comments" :key="idx"
        class="p-3 rounded-xl bg-base-100 min-w-full content-center items-center flex flex-row">
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
        <div v-if="isMyComment(comment.id)"
          class="flex content-center items-center cursor-pointer btn btn-soft btn-error h- p-3"
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
  </details>
</template>

<script setup lang="ts">
import type { CommentWithParsedDate } from '~/assets/types/backendTypes'
import type { ICommentHandler } from '~/assets/utils/backendUtils';

const props = defineProps<{
  comments: CommentWithParsedDate[],
  commentHandler: ICommentHandler
}>()

// always sorted
const myComments = ref<number[]>([])

onMounted(async () => {
  await props.commentHandler.myComments((res) => myComments.value = res.data)
  console.log('myComments', myComments.value)
})


const updateComment = (comments: CommentWithParsedDate[], idx: number, data: Comment) => {
  //@ts-ignore
  comments[idx] = { ...data, date: comments[idx].date }
}

const deleteComment = (comments: CommentWithParsedDate[], idx: number) => {
  comments = comments.splice(idx, 1);
}

const commentContent = ref('')

const postComment = async (cH: ICommentHandler, comments: CommentWithParsedDate[]) => {
  if (commentContent.value.trim() === '') {
    return
  }
  const input = commentContent.value;
  commentContent.value = '';

  let newCommentId = -1;
  await cH.postComment(input, (res) => newCommentId = res.data)
  await cH.getComment(newCommentId, (res) => {
    const newComment: CommentWithParsedDate = {
      ...res.data,
      date: new Date(res.data.timestamp_epoch).toLocaleString(),
    }
    console.log(res)
    comments.push(newComment)
  })
  myComments.value.push(newCommentId)
}

// Binary search to check if a comment is mine
const isMyComment = (commentId: number): boolean => {
  const arr = myComments.value;
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === commentId) return true;
    if (arr[mid] < commentId) left = mid + 1;
    else right = mid - 1;
  }

  return false;
}

</script>