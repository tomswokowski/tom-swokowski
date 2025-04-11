import { createWebHistory, createRouter } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import DashboardHomeView from '@/views/DashboardHomeView.vue';
import DashboardNotesView from '@/views/DashboardNotesView.vue';
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
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        component: DashboardHomeView,
      },
      {
        path: 'notes',
        component: DashboardNotesView,
      },
    ],
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
