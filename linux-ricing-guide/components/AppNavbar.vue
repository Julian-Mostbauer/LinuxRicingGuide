<template>
  <div class="navbar bg-opacity-70 backdrop-blur-md border-b-2 border-base-300 sticky top-0 z-50 h-16"
    style="background-color: rgba(var(--bg-base-200), 0.69)">

    <div class="flex-1 flex items-center text-neutral-content">
      <div class="tooltip tooltip-bottom" data-tip="Menu">
        <!-- Sidemenu -->
        <div class="drawer flex items-center justify-center">
          <input id="nav-drawer" type="checkbox" class="drawer-toggle" />

          <div class="drawer-content">
            <label for="nav-drawer" class="btn btn-ghost drawer-button pr-2 pl-2 text-base-content">
              <DynamicIcon :names="{
                'default': 'bars',
                'mdi': 'menu',
              }" :size="22" />
            </label>
          </div>

          <div class="drawer-side z-1">
            <label for="nav-drawer" aria-label="close sidebar" class="drawer-overlay"
              style="cursor: default !important;"></label>
            <AppSideMenu />
          </div>
        </div>
      </div>

      <!-- Breadcrumbs -->
      <div class="breadcrumbs text-xl text-base-content">
        <ul>
          <li /> <!-- Makes the first arrow appear next to the sidemenu bar -->
          <li v-for="routePart in routeParts" :key="routePart.fullPath">
            <NuxtLink class="text-xl" :to="`/${routePart.fullPath}`">
              {{ routePart.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <!-- Search bar-->
    <div class="flex gap-2 mr-2">
      <label class="input input-bordered hidden items-center gap-2 lg:w-92 sm:w-64 sm:flex">
        <Search/>
      </label>
    </div>

    <!-- Theme Picker-->
    <div class="tooltip tooltip-bottom" data-tip="Themes">
      <ThemePickerButton />
    </div>
  </div>
  <NuxtLoadingIndicator color="var(--color-primary)" :height="2" :throttle="0" class="mt-15.5"/>

</template>

<script setup lang="ts">
type RoutePart = { name: string, fullPath: string }

import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { toHeaderCase } from '~/assets/utils/caseUtils';

const route = useRoute()

const routeParts = ref<RoutePart[]>([]);

const updateRouteParts = () => {
  routeParts.value = route.fullPath
    .split('/')
    .filter(p => p)
    .map((part, index, arr) => {
      const fullPath = arr.slice(0, index + 1).join('/');
      return { name: toHeaderCase(part), fullPath };
    });
};

watch(route, updateRouteParts, { immediate: true });

updateRouteParts(); // Initial call to set routeParts

</script>