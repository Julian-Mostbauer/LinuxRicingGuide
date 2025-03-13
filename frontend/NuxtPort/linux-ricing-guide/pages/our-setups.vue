<template>
  <div class="flex flex-col gap-4 w-4/5 justify-center mx-auto">
    <SetupDisplay v-for="(user, index) in users" :key="index" :name="user.Name" :os="user.OS"
      :desktopEnvironment="user['Desktop Environment']" :windowManager="user['Window Manager']"
      :terminalEmulator="user['Terminal Emulator']" :terminalTheme="user['Terminal Theme']"
      :shellConfigurations="user['Shell Configurations']" :starshipPreset="user['Starship Preset']"
      :fileManager="user['File Manager']" :imageSrc="userImages[index]"
      :reverseOrder="index % 2 == 1" class="mt-8 mb-8"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SetupDisplay from '~/components/SetupDisplay.vue';

export default defineComponent({
  components: {
    SetupDisplay
  },
  data() {
    return {
      users: [
        {
          Name: 'Julian',
          OS: 'Ubuntu',
          'Desktop Environment': 'Gnome',
          'Window Manager': 'Forge',
          'Terminal Emulator': 'Gnome-Terminal',
          'Terminal Theme': 'Dracula',
          'Shell Configurations': 'Fish',
          'Starship Preset': 'Tokyo Night',
          'File Manager': 'Nautilus'
        },
        {
          Name: 'Erik',
          OS: 'Arch',
          'Desktop Environment': 'Wayland',
          'Window Manager': 'Wayland - Hyprland',
          'Terminal Emulator': 'Foot',
          'Terminal Theme': 'adw-gtk3-dark',
          'Shell Configurations': 'Fish',
          'Starship Preset': 'Custom',
          'File Manager': 'Nemo'
        }
      ],
      userImages: [
        'img/desktop-julian.webp',
        'img/desktop-erik.webp'
      ]
    };
  }
});
</script>

<script setup lang="ts">
definePageMeta({
  icon: 'laptop-code',
});
</script>