<template>
  <div class="container mx-auto p-4">
    <Motion as="div" :variants="container" initial="hidden" animate="visible"
      class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <Motion :variants="items" class="col-span-full">
        <GradientOutline circle-width="200px">
          <div class="card bg-base-200 text-base-content p-6 h-full border-primary">
            <section class="h-full flex">
              <VoteButton v-if="healthy && (auth0Id ?? false)" @click="backendWrapper.upvote((res) => {
                dynamicData = {
                  ...res.data, comments: dynamicData.comments
                }
              })" :data="dynamicData" vote-type="Up" :voter="backendWrapper" />
              <div class="flex flex-col flex-grow">
                <h2 class="mb-4 text-xl text-primary font-bold flex flex-row items-center">
                  <DynamicIcon :names="{ default: 'circle-info' }" class="mr-2" />
                  {{ jsonObject.name }}
                </h2>
                <p class="text-md flex-grow" v-html="jsonObject.description"></p>
              </div>
              <VoteButton v-if="healthy && (auth0Id ?? false)" @click="backendWrapper.downvote((res) => {
                dynamicData = {
                  ...res.data, comments: dynamicData.comments
                }
              })" :data="dynamicData" vote-type="Down" :voter="backendWrapper" />
            </section>
            <section v-if="healthy && (auth0Id ?? false)">
              <CommentSection :comments="dynamicData.comments ?? []" :commentHandler="backendWrapper" />
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
import type { DistroWithComments, CommentWithParsedDate } from '~/assets/types/backendTypes'

const auth0 = useAuth0()
const auth0Id: Ref<string | null> = ref(null)
const healthy = ref(false)
const backendWrapper = ref<IBackendWrapper>(BWF.createDisabled())

const epochToDate = (epoch: number): string => {
  if (!epoch) {
    return 'Some unknown time'
  }
  const date = new Date(epoch * 1000)
  return date.toLocaleString()
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

  backendWrapper.value.distroInfo((res) => dynamicData.value = res.data)
  backendWrapper.value.getComments((res) => {
    dynamicData.value.comments = res.data;
    dynamicData.value.comments.forEach((comment: CommentWithParsedDate) => {
      comment.date = epochToDate(comment.timestamp_epoch)
    })
    dynamicData.value.comments.sort((a: CommentWithParsedDate, b: CommentWithParsedDate) => {
      return b.timestamp_epoch - a.timestamp_epoch
    })
  })
})

onUnmounted(() => {
  intervalManager.stop()
})


const dynamicData = ref<DistroWithComments>({
  name: '',
  upvote_count: -1,
  downvote_count: -1,
  your_vote: 'None',
  comments: [
    {
      id: -1,
      content: 'THIS SHOULD NOT SHOW',
      timestamp_epoch: 0,
      upvote_count: -1,
      downvote_count: -1,
      your_vote: 'None',
      date: 'Some unknown time',
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
