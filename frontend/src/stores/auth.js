import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useApi } from '@/composables/useApi';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const { request } = useApi();

  const isLoggedIn = computed(() => !!user.value);

  async function fetchUser() {
    try {
      const data = await request('/api/user');
      user.value = data.user;
    } catch {
      user.value = null;
    }
  }

  function login() {
    const backendURL = import.meta.env.PROD ? '' : import.meta.env.VITE_BACKEND_URL;
    window.location.href = `${backendURL}/auth/github`;
  }

  function logout() {
    request('/auth/logout', { method: 'POST' }).finally(() => {
      user.value = null;
    });
  }

  return { user, isLoggedIn, fetchUser, login, logout };
});
