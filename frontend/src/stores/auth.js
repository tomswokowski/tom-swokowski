import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { apiFetch } from '@/api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isLoggedIn = computed(() => !!user.value);

  async function fetchUser() {
    try {
      const data = await apiFetch('/api/user');
      user.value = data.user ?? null;
    } catch {
      user.value = null;
    }
  }

  function login() {
    const backendURL = import.meta.env.PROD ? '' : import.meta.env.VITE_BACKEND_URL;
    window.location.href = `${backendURL}/auth/github`;
  }

  async function logout() {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } finally {
      user.value = null;
    }
  }

  return { user, isLoggedIn, fetchUser, login, logout };
});
