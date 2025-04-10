<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import DefaultLayout from '@/layouts/DefaultLayout.vue';
import MinimalLayout from '@/layouts/MinimalLayout.vue';

const route = useRoute();

const layouts = {
  DefaultLayout,
  MinimalLayout,
};

const layoutComponent = computed(() => {
  return layouts[route.meta.layout] || DefaultLayout;
});
</script>
