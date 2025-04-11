<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

import DefaultLayout from '@/layouts/DefaultLayout.vue';
import MinimalLayout from '@/layouts/MinimalLayout.vue';

const route = useRoute();
const auth = useAuthStore();

onMounted(() => {
  auth.fetchUser();
});

const layouts = {
  DefaultLayout,
  MinimalLayout,
};

const layoutComponent = computed(() => {
  return layouts[route.meta.layout] || DefaultLayout;
});
</script>
