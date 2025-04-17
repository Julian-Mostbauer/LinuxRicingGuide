<template>
  <div class="mx-auto p-4 rounded-xl bg-base-300 text-base shadow-lg">

    <h2 class="text-2xl font-bold mb-4 p-6">
      <DynamicIcon :names="{ default: 'brain' }" class="inline-block mr-2"/>
      Find Your Ideal Linux Distro</h2>

    <div v-if="!result">
      <p class="mb-4 text-lg">{{ currentQuestion.text }}</p>

      <div class="space-y-2">
        <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            @click="selectOption(option.next)"
            class="block w-full text-left bg-base-200 hover:bg-base-100 px-4 py-2 rounded-lg transition"
        >
          {{ option.label }}
        </button>
      </div>
    </div>

    <div v-else>
      <h3 class="text-xl font-semibold mb-2">
        <DynamicIcon :names="{ default: 'bullseye' }" class="inline-block mr-2"/>
        We recommend:</h3>
      <p class="text-3xl font-bold text-base-400">{{ result }}</p>
      <button @click="reset" class="block w-full text-left bg-base-200 hover:bg-base-100 px-4 py-2 rounded-lg transition mt-3">
        <DynamicIcon :names="{ default: 'repeat' }" class="inline-block mr-2"/>
        Start Over
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const questions = {
  start: {
    text: 'How experienced are you with Linux?',
    options: [
      { label: 'Beginner', next: 'beginner' },
      { label: 'Intermediate', next: 'intermediate' },
      { label: 'Advanced', next: 'advanced' },
    ],
  },
  beginner: {
    text: 'Do you want a system that works out of the box?',
    options: [
      { label: 'Yes', next: 'mint_pop' },
      { label: 'No, I want to explore a little', next: 'intermediate' },
    ],
  },
  intermediate: {
    text: 'Do you want the latest software (rolling release)?',
    options: [
      { label: 'Yes', next: 'manjaro' },
      { label: 'No, I prefer stability', next: 'debian_fedora' },
    ],
  },
  advanced: {
    text: 'What do you care most about?',
    options: [
      { label: 'Complete control', next: 'arch' },
      { label: 'Privacy & security', next: 'qubes' },
      { label: 'Learning through complexity', next: 'gentoo' },
    ],
  },
  mint_pop: {
    text: '',
    options: [],
    result: 'Linux Mint or Pop!_OS',
  },
  manjaro: {
    text: '',
    options: [],
    result: 'Manjaro or EndeavourOS',
  },
  debian_fedora: {
    text: '',
    options: [],
    result: 'Debian or Fedora',
  },
  arch: {
    text: '',
    options: [],
    result: 'Arch Linux',
  },
  gentoo: {
    text: '',
    options: [],
    result: 'Gentoo',
  },
  qubes: {
    text: '',
    options: [],
    result: 'Qubes OS',
  },
};

const currentStep = ref('start');
const result = ref(null);

const currentQuestion = computed(() => questions[currentStep.value]);

function selectOption(next) {
  if (questions[next].result) {
    result.value = questions[next].result;
  } else {
    currentStep.value = next;
  }
}

function reset() {
  result.value = null;
  currentStep.value = 'start';
}
</script>
