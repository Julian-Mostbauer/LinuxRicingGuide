<template>
  <div class="navbar bg-opacity-70 backdrop-blur-md border-b-2 border-base-300 sticky top-0 z-50 h-16 flex"
    style="background-color: rgba(var(--bg-base-200), 0.69)">

    <!-- Side bar -->
    <div class="flex-none">
      <div class="tooltip tooltip-bottom w-fit" data-tip="Menu">
        <!-- Sidemenu -->
        <div class="drawer drawer-fixed flex items-center justify-center">
          <input id="nav-drawer" type="checkbox" class="drawer-toggle" />

          <div class="drawer-content">
            <label for="nav-drawer" class="btn btn-ghost drawer-button pr-2 pl-2 text-base-content">
              <DynamicIcon :names="{
                'default': 'bars',
                'mdi': 'menu',
              }" :size="22" />
            </label>
          </div>

          <div class="drawer-side z-[100]">
            <label for="nav-drawer" aria-label="close sidebar" class="drawer-overlay"
              style="cursor: default !important;"></label>
            <AppSideMenu />
          </div>
        </div>
      </div>
    </div>

    <!-- Breadcrumbs -->
    <div class="breadcrumbs text-xl text-base-content whitespace-nowrap overflow-clip" style="max-width: 50%;">
      <ul>
        <li /> <!-- Makes the first arrow appear next to the sidemenu bar -->
        <li v-for="routePart in routeParts" :key="routePart.fullPath">
          <NuxtLink class="text-xl" :to="`/${routePart.fullPath}`">
            {{ routePart.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
    
    <!-- This spacer pushes the following elements to the right -->
    <div class="flex-1"></div>

    <!-- Search bar -->
    <div class="flex-none flex gap-2 mr-2">
      <label class="input input-bordered hidden items-center gap-2 lg:w-92 sm:w-64 sm:flex">
        <Search />
      </label>
    </div>

    <!-- Theme Picker -->
    <div class="flex-none tooltip tooltip-bottom" data-tip="Themes">
      <ThemePickerButton />
    </div>

    <!-- User Menu -->
    <div class="flex-none tooltip tooltip-left" data-tip="Account">
      <UserMenuButton />
    </div>
  </div>
  <NuxtLoadingIndicator color="var(--color-primary)" :height="2" :throttle="0" class="mt-15.5" />

</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router'
import { toHeaderCase } from '~/assets/utils/caseUtils';

const route = useRoute()
const routeParts = ref<{ name: string, fullPath: string }[]>([]);

const updateRouteParts = () => {
  routeParts.value = route.fullPath
    .split('?')[0] // Remove query parameters
    .split('#')[0] // Remove hash
    .split('/')
    .filter(p => p)
    .map((part, index, arr) => {
      const fullPath = arr.slice(0, index + 1).join('/');
      return { name: toHeaderCase(part), fullPath };
    });
};

watch(route, updateRouteParts, { immediate: true });
</script>