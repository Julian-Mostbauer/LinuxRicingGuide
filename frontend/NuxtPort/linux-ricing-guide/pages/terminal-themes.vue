<template>
  <div class="overflow-hidden">
    <SmallImageCardList :cardContents="themes" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  icon: 'palette',
});

const themes = [
  {
    title: "Nord",
    description: "Nord is a color scheme that is known for its arctic, north-bluish colors. You can use the Nord theme for your terminal emulator and shell.",
    link: "https://github.com/nordtheme/nord",
    imagePath: "https://repository-images.githubusercontent.com/77175710/e6b45480-68c3-11e9-9f8a-27537b031c4c"
  },
  {
    title: "Dracula",
    description: "Dracula is a color scheme that is known for its dark and vibrant colors. You can use the Dracula theme for your terminal emulator and shell.",
    link: "https://github.com/dracula/dracula-theme",
    imagePath: "https://th.bing.com/th/id/OIP.fl9gw8X94d2WkxcMhuh6lQHaDH?rs=1&pid=ImgDetMain"
  },
  {
    title: "Solarized",
    description: "Solarized is a color scheme that is known for its balanced and soothing colors. You can use the Solarized theme for your terminal emulator and shell.",
    link: "https://github.com/altercation/solarized",
    imagePath: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Solarized_Yin_Yang_logo.png"
  }
]
</script>