<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';

import DefaultLayout from '@/layouts/DefaultLayout.vue';
import MinimalLayout from '@/layouts/MinimalLayout.vue';

const route = useRoute();
const userStore = useUserStore();

onMounted(() => {
  userStore.loadUser();
});

const layouts = {
  DefaultLayout,
  MinimalLayout,
};

const layoutComponent = computed(() => {
  return layouts[route.meta.layout] || DefaultLayout;
});
</script>
