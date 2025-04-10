import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { fetchUser, redirectToLogin, logout } from '@/api/auth';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);

  const isLoggedIn = computed(() => !!user.value);

  async function fetchAndSetUser() {
    try {
      const data = await fetchUser();
      user.value = data.user ?? null;
    } catch {
      user.value = null;
    }
  }

  function login() {
    redirectToLogin();
  }

  async function logoutAndClear() {
    await logout();
    user.value = null;
  }

  return {
    user,
    isLoggedIn,
    fetchUser: fetchAndSetUser,
    login,
    logout: logoutAndClear,
  };
});
