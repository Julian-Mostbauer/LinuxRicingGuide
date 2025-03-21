<template>
  <div>
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-circle m-1"><DynamicIcon :names="{ 'default': 'palette' }" :size="20" /></div>
      <ul tabindex="0" class="dropdown-content bg-base-300 rounded-box z-1 p-2 shadow-2xl w-min"
        style="max-height: 15rem; overflow-y: auto;">
        <li v-for="theme in themes" :key="theme">

          <div class="btn btn-sm btn-block btn-ghost justify-start m-1 p-1 text-center" @click="setTheme(theme)">
            <DynamicIcon :names="{default: 'paintbrush'}" />
            <p>{{toHeaderCase(theme)}}</p>
            <input type="radio" name="theme-dropdown" class="theme-controller hidden" :value="theme" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toHeaderCase } from 'assets/utils/caseUtils'

onMounted(() => {
  const selectedTheme = localStorage.getItem('selectedTheme') || 'default';
  setTheme(selectedTheme);
})

const themes = [
  'default', 'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'valentine', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'dracula', 'cmyk', 'autumn', 'acid', 'lemonade', 'night', 'coffee', 'winter', 'dim', 'nord', 'sunset', 'caramellatte', 'abyss', 'silk'
]

function setTheme(theme: string) {
  localStorage.setItem('selectedTheme', theme);

  const radios = document.querySelectorAll('.theme-controller');

  radios.forEach((radioI) => {
    let radio = radioI as HTMLInputElement;
    if (radio.getAttribute('value') === theme) {
      radio.checked = true;
      // btn-primary
      radio.parentElement!.classList.add('btn-primary');
      radio.parentElement!.classList.remove('btn-ghost');
    } else {
      radio.checked = false;

      radio.parentElement!.classList.remove('btn-primary');
      radio.parentElement!.classList.add('btn-ghost');
    }
  });
}
</script>
