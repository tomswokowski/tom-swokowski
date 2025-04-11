<template>
  <div class="p-6">
    <h1 class="mb-4 text-2xl font-bold">Admin Login</h1>

    <div v-if="userStore.isLoggedIn">
      <p class="text-green-600">Already logged in. Redirecting...</p>
    </div>

    <div v-else>
      <p class="mb-4">This page is for admins only.</p>
      <button @click="handleLogin" class="text-blue-600 underline">Login with GitHub</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { login } from '@/api/user';

const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
  if (userStore.isLoggedIn) {
    router.replace('/dashboard');
  }
});

const handleLogin = () => {
  login();
};
</script>
