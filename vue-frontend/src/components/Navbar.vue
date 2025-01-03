<template>
  <nav class="flex items-center sticky top-0 z-50 justify-between px-6 py-4 bg-white shadow-md">
    <!-- Logo Section -->
    <div class="flex items-center space-x-3">
      <img src="../assets/folder-svgrepo-com.svg" alt="logo" />
      <span class="text-lg font-semibold">IPFS</span>
    </div>
    
    <!-- Navigation Links -->
    <div class="flex items-center space-x-4">
      <template v-if="isLoggedIn">
        <a href="/dashboard" class="px-4 py-2 text-gray-600 border rounded-md hover:text-gray-900">Dashboard</a>
        <button @click="logout" class="px-4 py-2 text-gray-600 border rounded-md hover:text-gray-900">Logout</button>
      </template>
      <button v-else @click="login" class="px-4 py-2 text-gray-600 border rounded-md hover:text-gray-900">Login</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent",
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    login() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
    },
  },
};
</script>
