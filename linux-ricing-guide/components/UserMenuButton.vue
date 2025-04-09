<template>
  <div>
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-circle m-0.5 overflow-clip">
        <DynamicIcon :names="{ default: 'user' }" size="20" />
      </div>
      <ul tabindex="0" class="card card-body dropdown-content bg-base-300 rounded-box z-1 p-2 shadow-2xl w-52">
        <li>
          <div class="border-2 border-base-100 shadow-md rounded-full flex items-center gap-2 p-1 text-center">
            <img :src="userIcon" alt="Theme Picker" class="w-12 h-12 rounded-full" />
            <p class="text-lg font-bold text-center">{{ userName }}</p>
          </div>
        </li>
        <div class="divider m-0" />
        <li>
          <div class="btn btn-ghost justify-start m-1 p-1 text-center w-full">
            <DynamicIcon :names="{ default: 'cog' }" />
            <p>Settings</p>
          </div>
        </li>
        <li>
          <div class="btn btn-error justify-start m-1 p-1 text-center w-full">
            <DynamicIcon :names="{ default: 'cog' }" />
            <p>Log out</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
var userName = ref('John Doe')
var userIcon = ref('https://picsum.photos/id/237/200/300')
</script>
