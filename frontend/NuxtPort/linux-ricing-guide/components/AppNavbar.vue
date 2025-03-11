<template>
  <div class="navbar bg-base-200 shadow-lg border-b border-base-300 sticky top-0 z-50">
    <div class="flex-1">
      <div class="breadcrumbs text-xl">
        <ul class="ml-2">
          <li><a href="/">
              <Icon name="fa6-solid:house" size="28" />
            </a></li>
          <li v-for="routePart in routeParts" :key="routePart.fullPath">
            <NuxtLink class="text-xl" :to="`/${routePart.fullPath}`">
              {{ routePart.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex gap-2">
      <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" v-model="searchQuery"
        @input="onSearchInput" />
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type RoutePart = { name: string, fullPath: string }

import { ref } from 'vue';
import { useRouter } from 'vue-router'
import siteWideSearch from '~/assets/utils/site-wide-search';

const route = useRoute()
const router = useRouter()

const routeParts: RoutePart[] = route.fullPath
  .split('/')
  .filter(p => p)
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .map((part, index, arr) => {
    const fullPath = arr.slice(0, index + 1).join('/');
    return { name: part, fullPath };
  })

const searchQuery = ref('');

const onSearchInput = () => {
  search(searchQuery.value);
}

const search = (inp: string) => {
  if (!inp) return;
  console.log(siteWideSearch(inp, router));
}

</script>