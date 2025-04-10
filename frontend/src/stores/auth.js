import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);

  async function fetchUser() {
    try {
      const res = await fetch('/api/user', {
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        user.value = data.user;
      } else {
        user.value = null;
      }
    } catch {
      user.value = null;
    }
  }

  function logout() {
    fetch('/auth/logout', {
      method: 'POST',
      credentials: 'include',
    }).finally(() => {
      user.value = null;
    });
  }

  return { user, fetchUser, logout };
});
