<template>
  <div class="navbar bg-opacity-70 backdrop-blur-md border-b-2 border-gray-800 sticky top-0 z-50" style="background-color: rgb(14 23 30 / 69%)">
    <div class="flex-1 flex items-center">
      <div class="tooltip tooltip-bottom" data-tip="Menu">
        <!-- Sidemenu -->
        <div class="drawer flex items-center justify-center">
          <input id="nav-drawer" type="checkbox" class="drawer-toggle" />

          <div class="drawer-content">
            <label for="nav-drawer" class="btn btn-ghost drawer-button pr-2 pl-2">
              <Icon name="fa6-solid:bars" size="22" />
            </label>
          </div>

          <div class="drawer-side z-1">
            <label for="nav-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <AppSideMenu />
          </div>
        </div>
      </div>

      <!-- Breadcrumbs -->
      <div class="breadcrumbs text-xl">
        <ul>
          <li></li>
          <li v-for="routePart in routeParts" :key="routePart.fullPath">
            <NuxtLink class="text-xl" :to="`/${routePart.fullPath}`">
              {{ routePart.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex gap-2 mr-2">
      <label class="input input-bordered hidden items-center gap-2 lg:w-92 sm:w-64 sm:flex">
        <input type="text" placeholder="Search" class="grow" v-model="searchQuery" @input="onSearchInput" />
        <Icon name="fa6-solid:magnifying-glass" size="20" />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
type RoutePart = { name: string, fullPath: string }

import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import siteWideSearch from '~/assets/utils/siteWideSearch';

const route = useRoute()
const router = useRouter()

const routeParts = ref<RoutePart[]>([]);

const updateRouteParts = () => {
  routeParts.value = route.fullPath
    .split('/')
    .filter(p => p)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .map((part, index, arr) => {
      const fullPath = arr.slice(0, index + 1).join('/');
      return { name: part, fullPath };
    });
};

watch(route, updateRouteParts, { immediate: true });

const searchQuery = ref('');

const onSearchInput = () => {
  search(searchQuery.value);
}

const search = (inp: string) => {
  if (!inp) return;
  console.log(siteWideSearch(inp, router));
}

updateRouteParts(); // Initial call to set routeParts

</script>