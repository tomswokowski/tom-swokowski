import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { fetchUser, redirectToLogin, logout } from '@/api/auth';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);

  const isLoggedIn = computed(() => !!user.value);

  async function fetchAndSetUser() {
    user.value = await fetchUser();
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
