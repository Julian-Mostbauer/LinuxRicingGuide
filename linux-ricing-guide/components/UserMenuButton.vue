<template>
  <div>
    <div class="dropdown dropdown-end rounded-full bg-base-200">
      <div tabindex="0" role="button" class="btn btn-circle m-0.5 overflow-clip">
        <img :src="userIcon" alt="Theme Picker" class="w-12 h-12" />
      </div>
      <ul tabindex="0" class="card card-body dropdown-content bg-base-300 rounded-box z-1 p-2 shadow-2xl w-52">
        <li>
          <div class="justify-start m-1 m-b-0 p-1 text-center">
            <DynamicIcon :names="{ default: 'user' }" />
            <p>Logged in as {{ userName }}</p>
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
