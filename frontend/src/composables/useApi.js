import { ref } from 'vue';

export function useApi() {
  const loading = ref(false);
  const error = ref(null);
  const data = ref(null);

  const request = async (url, options = {}) => {
    loading.value = true;
    error.value = null;

    try {
      const res = await fetch(url, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.statusText}`);
      }

      const result = await res.json();
      data.value = result;
      return result;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    data,
    request,
  };
}
