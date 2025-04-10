<template>
  <div v-if="!isLoggedIn">
    <div>
      <div tabindex="0" role="button" class="btn btn-circle m-0.5 overflow-clip">
        <DynamicIcon :names="{ default: 'user' }" :size="20" />
      </div>
    </div>
  </div>
  <div v-else>
    <div v-if="auth0.isLoading.value">
      <div class="skeleton h-10 w-10 shrink-0 rounded-full" />
    </div>
    <div v-else class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-circle m-0.5 overflow-clip">
        <img :src="auth0.user.value?.picture" alt="Account" class="w-12 h-12 rounded-full" />
      </div>
      <ul tabindex="0" class="card card-body dropdown-content bg-base-300 rounded-box z-1 p-2 shadow-2xl w-52">
        <li>
          <div class="border-2 border-base-100 shadow-md rounded-full flex items-center gap-2 p-1 text-center">
            <img :src="auth0.user.value?.picture" alt="Account" class="w-12 h-12 rounded-full" />
            <p class="text-lg font-bold text-center">{{ auth0.user.value?.name }}</p>
          </div>
        </li>
        <li>
          <div class="btn btn-error justify-start m-1 p-1 text-center w-full" @click="logout()">
            <DynamicIcon :names="{ default: 'cog' }" />
            <p>Log out</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuth0 } from "@auth0/auth0-vue";

const auth0 = useAuth0();
const logout = () => {
  auth0.logout({ logoutParams: { returnTo: window.location.origin } });
};

defineProps<{
  isLoggedIn: boolean
}>();
</script>
