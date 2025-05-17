<template>
  <div v-if="auth0.user.value === undefined">
    <div>
      <div tabindex="0" role="button" class="btn btn-circle m-0.5 overflow-clip" @click="login()">
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
      <ul tabindex="0" class="card card-body dropdown-content bg-base-300 z-1 p-4 shadow-2xl w-64 text-xl">
        <li>
            <p class="text-center">
              Welcome back,
              <br>
              <span class="font-bold">{{ auth0.user.value?.name }}</span>
            </p>
        </li>
        <li>
          <div class="btn btn-error justify-start m-1 p-1 text-center w-full" @click="logout()">
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
import { ref, onMounted, onUnmounted } from "vue";

const login = () => {
  if (auth0.user.value === undefined) {
    try {
      auth0.loginWithPopup();
    }
    catch (e) {
      alert("Popup was cancelled. Please try again.");
    }
  }
};

const logout = () => {
  auth0.logout({ logoutParams: { returnTo: window.location.origin } });
};
</script>
