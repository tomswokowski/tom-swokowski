<template>
  <div class="p-6">
    <h1 class="mb-4 text-2xl font-bold">Dashboard</h1>

    <div v-if="userStore.isLoggedIn">
      <p>Welcome, {{ userStore.user.login }} 👋</p>
      <p class="mt-4 text-sm text-gray-500">This is your admin dashboard.</p>
      <button @click="handleLogout" class="mt-4 text-red-600 underline">Logout</button>
    </div>

    <div v-else>
      <p class="mb-4">This page is for admins only.</p>
      <button @click="handleLogin" class="text-blue-600 underline">Login with GitHub</button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { login, logout } from '@/api/user';

const userStore = useUserStore();

const handleLogin = () => {
  login();
};

const handleLogout = async () => {
  await logout();
  userStore.clearUser();
};
</script>
