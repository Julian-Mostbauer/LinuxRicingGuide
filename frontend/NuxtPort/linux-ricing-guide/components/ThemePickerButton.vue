<template>
  <div>
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn m-1"> Theme </div>
      <ul tabindex="0" class="dropdown-content bg-base-300 rounded-box z-1 p-2 shadow-2xl w-min"
        style="transform: translateX(-30%); max-height: 10rem; overflow-y: auto;">
        <li v-for="theme in themes" :key="theme">
          <input type="radio" name="theme-dropdown"
            class="theme-controller btn btn-sm btn-block btn-ghost justify-start m-1 p-1 text-center"
            :aria-label="toHeaderCase(theme)" :value="theme" v-model="selectedTheme" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { toHeaderCase } from 'assets/utils/caseUtils'

const themes = [
  'default', 'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter', 'dim', 'nord', 'sunset', 'caramellatte', 'abyss', 'silk'
]

const selectedTheme = ref(
  import.meta.client ? localStorage.getItem('selectedTheme') || 'default' : 'default'
);

watch(selectedTheme, (newTheme) => {
  if (import.meta.client) {
    localStorage.setItem('selectedTheme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }
});
</script>
