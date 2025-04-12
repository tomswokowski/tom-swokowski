import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getUser } from '@/api/user';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const isLoggedIn = computed(() => !!user.value);
  const hasLoaded = ref(false);

  async function loadUser() {
    if (hasLoaded.value) return;

    try {
      const data = await getUser();
      user.value = data.user ?? null;
    } catch {
      user.value = null;
    } finally {
      hasLoaded.value = true;
    }
  }

  function clearUser() {
    user.value = null;
    hasLoaded.value = false;
  }

  return {
    user,
    isLoggedIn,
    loadUser,
    clearUser,
  };
});
