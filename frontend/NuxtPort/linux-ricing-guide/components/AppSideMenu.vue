<template>
  <div>
    <ul class="menu menu-xs bg-base-200 rounded-box max-w-xs w-full">
      <li v-for="route in routes" :key="route.path">
        <a :href="route.path">
          <svg v-if="route.meta && route.meta.icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="h-4 w-4">
            <path :d="route.meta.icon" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          {{ route.name }}
        </a>
        <details v-if="route.children && route.children.length" open>
          <summary>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
            {{ route.name }}
          </summary>
          <ul>
            <li v-for="child in route.children" :key="child.path">
              <a :href="child.path">
                <svg v-if="child.meta && child.meta.icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="h-4 w-4">
                  <path :d="child.meta.icon" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                {{ child.name }}
              </a>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const routes = router.options.routes;

    return {
      routes
    };
  }
};
</script>
