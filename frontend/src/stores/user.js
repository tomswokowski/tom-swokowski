import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getUser } from '@/api/user';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const isLoggedIn = computed(() => !!user.value);

  async function loadUser() {
    try {
      const data = await getUser();
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
    loadUser,
    clearUser,
  };
});
