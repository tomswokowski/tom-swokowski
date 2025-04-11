import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { fetchUser } from '@/api/user';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const isLoggedIn = computed(() => !!user.value);

  async function setUser() {
    try {
      const data = await fetchUser();
      user.value = data.user ?? null;
    } catch {
      user.value = null;
    }
  }

  function clearUser() {
    user.value = null;
  }

  return {
    user,
    isLoggedIn,
    setUser,
    clearUser,
  };
});
