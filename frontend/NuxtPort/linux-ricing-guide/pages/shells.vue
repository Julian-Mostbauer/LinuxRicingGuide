<template>
  <div class="overflow-hidden">
    <SmallImageCardList :cardContents="shells" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  icon: 'floppy-disk',
});

const shells = [
  {
    title: "Bash",
    description: "Bash is the default shell for most Linux distributions. You can customize Bash using Bash configuration files.",
    link: "https://www.gnu.org/software/bash/",
    imagePath: "https://images.seeklogo.com/logo-png/39/1/bash-logo-png_seeklogo-393098.png"
  },
  {
    title: "Zsh",
    description: "Zsh is a powerful shell that is known for its extensibility. You can customize Zsh using Zsh configuration files.",
    link: "https://ohmyz.sh/",
    imagePath: "https://ohmyz.sh/img/ohmyzsh-logo-ansi.png"
  },
  {
    title: "Fish",
    description: "Fish is a user-friendly shell that is known for its simplicity. You can customize Fish using Fish configuration files.",
    link: "https://fishshell.com/",
    imagePath: "https://fishshell.com/assets/img/Terminal_Logo2_CRT_Flat.png"
  }

]
</script>