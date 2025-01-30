<template>
  <nav class="flex items-center sticky top-0 z-50 justify-between px-6 py-4 bg-white shadow-md">
    <!-- Logo Section -->
    <RouterLink to="/">
      <div class="flex items-center space-x-3">
        <img src="../assets/folder-svgrepo-com.svg" alt="logo" />
        <span class="text-lg font-semibold">IPFS</span>
      </div>
    </RouterLink>

    <!-- Navigation Links -->
    <div class="flex items-center space-x-4">
      <template v-if="this.loginState.isLoggedIn">
      {{ this.loginState.displayName }}
        <RouterLink to="/dashboard" class="px-4 py-2 text-gray-600 border rounded-md hover:text-gray-900">Dashboard
        </RouterLink>
        <button @click="logout" class="px-4 py-2 text-gray-600 border rounded-md hover:text-gray-900">Logout</button>
      </template>
      <button v-else class="px-4 py-2 text-gray-600 border rounded-md hover:text-gray-900">
        <RouterLink to="/register">
        Login
        </RouterLink>
      </button>
    </div>
  </nav>
</template>

<script>
import { RouterLink } from 'vue-router';
import { useLoginState } from '../stores/loginStateStore';

// const loginState = useLoginState();

export default {
  name: "NavbarComponent",
  data() {
    return {
      loginState: useLoginState()
    };
  },
  methods: {
    logout() {
      this.loginState.logout();
    },
  },
};
</script>
