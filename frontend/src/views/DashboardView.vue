<template>
  <div class="p-6">
    <h1 class="mb-4 text-2xl font-bold">Dashboard</h1>

    <div v-if="auth.user">
      <p>Welcome, {{ auth.user.login }} 👋</p>
      <p class="mt-4 text-sm text-gray-500">This is your protected content.</p>
      <button @click="auth.logout" class="mt-4 text-red-600 underline">Logout</button>
    </div>

    <div v-else>
      <p class="mb-4">This page is for admins only.</p>
      <button @click="login" class="text-blue-600 underline">Login with GitHub</button>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';

const auth = useAuthStore();

onMounted(() => {
  auth.fetchUser();
});

const login = () => {
  window.location.href = 'http://localhost:3001/auth/github';
};
</script>
