<template>
  <div class="card rounded-xl shadow-xl bg-base-200 flex flex-row">
    <!-- Data Section -->
    <div class="card-body w-1/3">
      <h2 class="card-title">{{ name }}</h2>
      <p><strong>OS:</strong> {{ os }}</p>
      <p><strong>Desktop Environment:</strong> {{ desktopEnvironment }}</p>
      <p><strong>Window Manager:</strong> {{ windowManager }}</p>
      <p><strong>Terminal Emulator:</strong> {{ terminalEmulator }}</p>
      <p><strong>Terminal Theme:</strong> {{ terminalTheme }}</p>
      <p><strong>Shell Configurations:</strong> {{ shellConfigurations }}</p>
      <p><strong>Starship Preset:</strong> {{ starshipPreset }}</p>
      <p><strong>File Manager:</strong> {{ fileManager }}</p>
    </div>

    <!-- Image Section -->
    <figure class="w-2/3 h-full overflow-hidden border-l border-gray-300 rounded-xl rounded-l-none">
      <img :src="imageSrc" :alt="`${name}'s desktop screenshot`" class="w-full h-full object-cover overflow-hidden" />
    </figure>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  name: string;
  os: string;
  desktopEnvironment: string;
  windowManager: string;
  terminalEmulator: string;
  terminalTheme: string;
  shellConfigurations: string;
  starshipPreset: string;
  fileManager: string;
  imageSrc: string;
}>();
</script>
