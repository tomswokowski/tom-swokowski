import { createWebHistory, createRouter } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const routes = [
  {
    path: '/',
    component: HomeView,
    meta: { layout: 'DefaultLayout' },
  },
  {
    path: '/about',
    component: AboutView,
    meta: { layout: 'MinimalLayout' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
    meta: { layout: 'MinimalLayout' },
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
