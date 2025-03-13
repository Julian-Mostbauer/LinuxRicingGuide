<template>
  <div class="flex flex-col items-center">
    <SmallImageCard title="GNOME"
      description="GNOME is a popular desktop environment that is known for its clean and modern design. You can customize GNOME using GNOME Shell extensions and themes."
      link="https://www.gnome.org/"
      image-path="https://www.logotypes101.com/logos/614/95CECC9C5E181AF9EB7085A2DF4ECE50/Gnome_GNU_Linux.png">
    </SmallImageCard>

    <SmallImageCard title="KDE"
      description="KDE is a powerful and customizable desktop environment that is known for its flexibility. You can customize KDE using Plasma widgets and themes."
      link="https://kde.org/"
      image-path="https://th.bing.com/th/id/R.d725d5fcfd0ceff7bbed75cf4b5f88fc?rik=kGU3Gi0wsPUiJQ&pid=ImgRaw&r=0">
    </SmallImageCard>

    <SmallImageCard title="Xfce"
      description="Xfce is a lightweight and fast desktop environment that is known for its simplicity. You can customize Xfce using Xfce themes and plugins."
      link="https://xfce.org/"
      image-path="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Xfce_logo.svg/1024px-Xfce_logo.svg.png">
    </SmallImageCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  icon: 'display',
});
</script>