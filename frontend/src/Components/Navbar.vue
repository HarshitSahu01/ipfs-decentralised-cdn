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
      <span class="px-2">
        {{ this.loginState.displayName }}
      </span>
        <RouterLink to="/dashboard" class="px-4 py-2 text-gray-600 border rounded-md hover:text-gray-900">Dashboard
        </RouterLink>
        <button @click="logout" class="px-4 py-2 text-gray-600 border rounded-md hover:text-gray-900">Logout</button>
      </template>
        <RouterLink v-else to="/register">
      <button class="px-4 py-2 text-gray-600 border rounded-md hover:text-gray-900">
        Login
      </button>
        </RouterLink>
    </div>
  </nav>
</template>

<script>
import { RouterLink } from 'vue-router';
import { useLoginState } from '../stores/loginStateStore';
import { useRouter } from 'vue-router';

// const loginState = useLoginState();

export default {
  name: "NavbarComponent",
  data() {
    return {
      loginState: useLoginState(),
      router: useRouter()
    };
  },
  methods: {
    logout() {
      this.loginState.logout();
      this.router.push({ name: 'home' });
    },
  },
};
</script>
