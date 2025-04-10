<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script>
if (typeof window !== 'undefined') {
  var savedTheme = localStorage.getItem('selectedTheme') || 'default';
  document.documentElement.setAttribute('data-theme', savedTheme);
}
</script>