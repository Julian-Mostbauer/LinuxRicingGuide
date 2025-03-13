<template>
  <div>
    <div class="flex flex-col items-center">
      <SmallImageCard title="GNOME Terminal"
        description="GNOME Terminal is the default terminal emulator for GNOME. You can customize GNOME Terminal using profiles and preferences."
        link="https://help.gnome.org/users/gnome-terminal/stable/"
        image-path="https://www.logotypes101.com/logos/614/95CECC9C5E181AF9EB7085A2DF4ECE50/Gnome_GNU_Linux.png">
      </SmallImageCard>

      <SmallImageCard title="Konsole"
        description="Konsole is the default terminal emulator for KDE. You can customize Konsole using profiles and settings."
        link="https://konsole.kde.org/" image-path="https://konsole.kde.org/assets/img/app_icon.png"></SmallImageCard>

      <SmallImageCard title="xfce4-terminal"
        description="xfce4-terminal is the default terminal emulator for Xfce. You can customize xfce4-terminal using preferences and settings."
        link="https://docs.xfce.org/apps/xfce4-terminal/start"
        image-path="https://gitlab.xfce.org/uploads/-/system/project/avatar/35/utilities-terminal.png"></SmallImageCard>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  icon: 'server',
});
</script>