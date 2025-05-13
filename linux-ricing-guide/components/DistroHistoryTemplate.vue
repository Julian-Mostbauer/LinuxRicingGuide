<template>
  <div class="container mx-auto p-4">
    <Motion as="div" :variants="container" initial="hidden" animate="visible"
      class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <Motion :variants="items" class="col-span-full">
        <GradientOutline circle-width="200px">
          <div class="card bg-base-200 text-base-content p-6 h-full border-primary">
            <section class="h-full flex">
              <div v-if="healthy && (auth0Id ?? false)"
                class="flex flex-col justify-center items-center mr-4 border-r-4"
                @click="backendWrapper.upvote((res) => dynamicData = res.data)" :class="{
                  'text-primary':
                    dynamicData.your_vote == 'Up',
                }">
                {{ dynamicData.upvote_count }}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4l-7 8h4v8h6v-8h4z" />
                </svg>
              </div>
              <div class="flex flex-col flex-grow">
                <h2 class="mb-4 text-xl text-primary font-bold flex flex-row items-center">
                  <DynamicIcon :names="{ default: 'circle-info' }" class="mr-2" />
                  {{ jsonObject.name }}
                </h2>
                <p class="text-md flex-grow" v-html="jsonObject.description"></p>
              </div>
              <div v-if="healthy && (auth0Id ?? false)"
                class="flex flex-col justify-center items-center ml-4 border-l-4"
                @click="backendWrapper.downvote((res) => dynamicData = res.data)" :class="{
                  'text-primary':
                    dynamicData.your_vote == 'Down',
                }">
                {{ dynamicData.downvote_count }}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 20l7-8h-4V4h-6v8H5z" />
                </svg>
              </div>
            </section>
            <section v-if="healthy && (auth0Id ?? false)" class="mt-4">
              <h2 class="mb-4 text-xl font-bold flex flex-row items-center">
                <DynamicIcon :names="{ default: 'comment' }" class="mr-2" />
                Post a comment
              </h2>
              <div class="flex flex-col space-y-3">
                <textarea v-model="commentContent" class="textarea textarea-bordered w-full"
                  placeholder="Write your comment here..."></textarea>
                <button @click="postComment()" class="btn btn-primary">Post
                  Comment</button>
              </div>
            </section>
            <section v-if="healthy && (auth0Id ?? false)">
              <details class="mt-4">
                <summary class="cursor-pointer text-lg font-semibold text-primary">
                  Comments ({{
                    dynamicData.comments?.length ?? 0
                  }})
                </summary>
                <div v-if="
                  dynamicData.comments &&
                  dynamicData.comments.length > 0
                " class="mt-2 space-y-3">
                  <div v-for="(comment, idx) in dynamicData.comments" :key="idx" class="p-3 rounded bg-base-100 border">
                    <div class="text-sm text-base-content font-medium mb-1">
                      {{
                        epochToDate(
                          comment.timestamp_epoch
                        ) ?? 'Some unknown time'
                      }}
                    </div>
                    <div class="text-base-content text-sm">
                      {{ comment.content }}
                    </div>
                  </div>
                </div>
                <div v-else class="mt-2 text-base-content/60 text-sm">
                  No comments yet.
                </div>
              </details>
            </section>
          </div>
        </GradientOutline>
      </Motion>
      <Motion v-for="(section, index) in jsonObject.sections" :key="index" :variants="items" :class="index === jsonObject.sections.length - 1
        ? `w-full ${jsonObject.sections.length % 2 != 0
          ? 'col-span-full'
          : ''
        }`
        : 'w-full'
        ">
        <GradientOutline circle-width="200px">
          <div class="card bg-base-200 text-base-content p-6 h-full">
            <section class="mb-6 h-full flex flex-col">
              <h2 class="mb-4 text-xl font-bold flex flex-row items-center">
                <DynamicIcon :names="{ default: section.icon }" class="mr-2" />
                {{ section.title }}
              </h2>
              <p class="text-md flex-grow" v-html="section.text"></p>
            </section>
          </div>
        </GradientOutline>
      </Motion>
    </Motion>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { getUserID } from '~/assets/utils/idUtils'
import IntervalManager from '~/assets/utils/intervalManager'
import { BackendWrapperFactory as BWF, type IBackendWrapper } from '~/assets/utils/backendUtils'

const auth0 = useAuth0()
const auth0Id: Ref<string | null> = ref(null)
const healthy = ref(false)
const commentContent = ref('')
const backendWrapper = ref<IBackendWrapper>(BWF.createDisabled())

const epochToDate = (epoch: number) => {
  const date = new Date(epoch * 1000)
  return date.toLocaleString()
}

const postComment = async () => {
  if (commentContent.value.trim() === '') {
    return
  }

  await backendWrapper.value.postComment(commentContent.value)
  commentContent.value = ''
}

let intervalManager = new IntervalManager()

const updateBackendWrapper = async () => {
  backendWrapper.value = auth0Id.value && healthy.value
    ? BWF.create(auth0Id.value, jsonObject.name)
    : BWF.createDisabled()
}

onMounted(async () => {
  auth0Id.value = await getUserID(auth0)

  intervalManager.start((async () => {
    try {
      healthy.value = JSON.parse(
        window.localStorage.getItem('backendHealth') || 'false'
      )
      await updateBackendWrapper()
    } catch {
      healthy.value = false
    }
  }), 10000)

  backendWrapper.value.distroInfo((res) => {
    dynamicData.value = res.data
    dynamicData.value.comments = dummyComments
  })
})

onUnmounted(() => {
  intervalManager.stop()
})

const dummyComments = [
  {
    id: 1,
    content: 'I am a dummy comment',
    timestamp_epoch: 0,
    upvote_count: -1,
    downvote_count: -1,
    your_vote: 'Down',
  },
  {
    id: 2,
    content: 'THIS IS A TEST COMMENT',
    timestamp_epoch: 1231212320,
    upvote_count: -1,
    downvote_count: -1,
    your_vote: 'None',
  },
  {
    id: 3,
    content: 'Hi there, I am a comment',
    timestamp_epoch: 2231212320,
    upvote_count: -1,
    downvote_count: -1,
    your_vote: 'Up',
  },
]

const dynamicData = ref({
  name: '',
  upvote_count: -1,
  downvote_count: -1,
  your_vote: '',
  comments: [
    {
      id: -1,
      content: 'THIS SHOULD NOT SHOW',
      timestamp_epoch: 0,
      upvote_count: -1,
      downvote_count: -1,
      your_vote: 'None',
    },
  ],
})


const container = {
  hidden: { opacity: 0, scale: 0.95 }, // Adjusted to avoid layout shift
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      delayChildren: 0.3, // Slightly reduced delay for smoother animation
      staggerChildren: 0.2,
    },
  },
}

const items = {
  hidden: { y: 20, opacity: 0, scale: 0.85 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
}

interface Section {
  title: string
  text: string
  icon: string
}

interface History {
  name: string
  description: string
  sections: Section[]
}

const route = useRoute()
const meta = route.meta
const jsonObject = meta.jsonObject as History
</script>
