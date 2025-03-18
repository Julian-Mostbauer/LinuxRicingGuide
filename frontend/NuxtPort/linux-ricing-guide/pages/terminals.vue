<template>
  <div class="overflow-hidden">
    <SmallImageCardList :cardContents="terminals" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  icon: 'server',
});

const terminals = [
  {
    title: "GNOME Terminal",
    description: "GNOME Terminal is the default terminal emulator for GNOME. You can customize GNOME Terminal using profiles and preferences.",
    link: "https://help.gnome.org/users/gnome-terminal/stable/",
    imagePath: "https://www.logotypes101.com/logos/614/95CECC9C5E181AF9EB7085A2DF4ECE50/Gnome_GNU_Linux.png"
  },
  {
    title: "Konsole",
    description: "Konsole is the default terminal emulator for KDE. You can customize Konsole using profiles and settings.",
    link: "https://konsole.kde.org/",
    imagePath: "https://konsole.kde.org/assets/img/app_icon.png"
  },
  {
    title: "xfce4-terminal",
    description: "xfce4-terminal is the default terminal emulator for Xfce. You can customize xfce4-terminal using preferences and settings.",
    link: "https://docs.xfce.org/apps/xfce4-terminal/start",
    imagePath: "https://gitlab.xfce.org/uploads/-/system/project/avatar/35/utilities-terminal.png"
  }
]
</script>