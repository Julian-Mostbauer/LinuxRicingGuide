<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script>
(function () {
  if (typeof window === 'undefined') return;
  var savedTheme = localStorage.getItem('selectedTheme') || 'default';
  document.documentElement.setAttribute('data-theme', savedTheme);
})();
</script>