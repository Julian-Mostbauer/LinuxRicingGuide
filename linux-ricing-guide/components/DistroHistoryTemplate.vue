<template>
  <div class="container mx-auto p-4">
    <Motion as="div" :variants="container" initial="hidden" animate="visible"
      class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <Motion :variants="items" class=" col-span-full">
        <GradientOutline circle-width="200px">
          <div class="card bg-base-200 text-base-content p-6 h-full border-primary">
            <section class="h-full flex">
              <div v-if="healthy && (auth0Id ?? false)"
                class="flex flex-col justify-center items-center mr-4 border-r-4" @click="upvote()"
                :class="{ 'text-primary': dynamicData.your_vote == 'Up' }">
                {{ dynamicData.upvote_count }}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4l-7 8h4v8h6v-8h4z" />
                </svg>
              </div>
              <div>
                <h2 class="mb-4 text-xl text-primary font-bold flex flex-row items-center">
                  <DynamicIcon :names="{ default: 'circle-info' }" class="mr-2" /> {{ jsonObject.name }}
                </h2>
                <p class="text-md flex-grow" v-html="jsonObject.description"></p>
              </div>
              <div v-if="healthy && (auth0Id ?? false)"
                class="flex flex-col justify-center items-center ml-4 border-l-4" @click="downvote()"
                :class="{ 'text-primary': dynamicData.your_vote == 'Down' }">
                {{ dynamicData.downvote_count }}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 20l7-8h-4V4h-6v8H5z" />
                </svg>
              </div>
            </section>
          </div>
        </GradientOutline>
      </Motion>
      <Motion v-for="(section, index) in jsonObject.sections" :key="index" :variants="items" :class="index === jsonObject.sections.length - 1
        ? `w-full ${jsonObject.sections.length % 2 != 0 ? 'col-span-full' : ''}`
        : 'w-full'">
        <GradientOutline circle-width="200px">
          <div class="card bg-base-200 text-base-content p-6 h-full">
            <section class="mb-6 h-full flex flex-col">
              <h2 class="mb-4 text-xl font-bold flex flex-row items-center">
                <DynamicIcon :names="{ default: section.icon }" class="mr-2" /> {{ section.title }}
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
import { onMounted } from 'vue';
import { useAuth0 } from "@auth0/auth0-vue";
import { getUserID } from '~/assets/utils/idUtils';
import { toBackendCase } from '~/assets/utils/caseUtils';
import IntervalManager from '~/assets/utils/intervalManager';

const auth0 = useAuth0();
const auth0Id: Ref<string | null> = ref(null);
const healthy = ref(false);

const fetchHealth = async () => {
  try {
    healthy.value = JSON.parse(window.localStorage.getItem("backendHealth") || 'false');
  } catch {
    healthy.value = false;
  }
};

let intervalManager = new IntervalManager();

onMounted(async () => {
  auth0Id.value = await getUserID(auth0);

  fetchHealth();
  intervalManager.start(fetchHealth, 10000);

  const res = await $fetch(`/api/dbWrapper/distros/distroInfo`, {
    method: 'POST',
    body: {
      name: toBackendCase(jsonObject.name),
      id: auth0Id.value,
    },
  }) as any;

  if (res.data) {
    dynamicData.value = res.data;
  }
});

onUnmounted(() => {
  intervalManager.stop();
});

const dynamicData = ref({
  name: '',
  upvote_count: -1,
  downvote_count: -1,
  your_vote: ''
});

const upvote = async () => {
  const res = await $fetch(`/api/dbWrapper/distros/upvote`, {
    method: 'POST',
    body: {
      name: toBackendCase(jsonObject.name),
      id: auth0Id.value,
    },
  }) as any;

  if (res.data) {
    dynamicData.value = res.data;
  }
}
const downvote = async () => {
  const res = await $fetch(`/api/dbWrapper/distros/downvote`, {
    method: 'POST',
    body: {
      name: toBackendCase(jsonObject.name),
      id: auth0Id.value,
    },
  }) as any;

  if (res.data) {
    dynamicData.value = res.data;
  }
}

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
  title: string;
  text: string;
  icon: string;
}

interface History {
  name: string;
  description: string;
  sections: Section[];
}

const route = useRoute()
const meta = route.meta;
const jsonObject = meta.jsonObject as History;
</script>