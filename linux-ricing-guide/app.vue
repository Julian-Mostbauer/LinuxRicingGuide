<template>
  <div>
      <NuxtRouteAnnouncer />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
  </div>
</template>

<script>
import index from "~/pages/index.vue";
import {createAuth0} from "@auth0/auth0-vue";

(function () {
  if (typeof window === 'undefined') return;
  var savedTheme = localStorage.getItem('selectedTheme') || 'default';
  document.documentElement.setAttribute('data-theme', savedTheme);
})();
</script>