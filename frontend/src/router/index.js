import { createWebHistory, createRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import AdminLoginView from '@/views/AdminLoginView.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import DashboardHomeView from '@/views/DashboardHomeView.vue';
import DashboardNotesView from '@/views/DashboardNotesView.vue';
import DashboardNoteDetailView from '@/views/DashboardNoteDetailView.vue';
import DashboardNoteCreateView from '@/views/DashboardNoteCreateView.vue';
import DashboardNoteEditView from '@/views/DashboardNoteEditView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const routes = [
  { path: '/', component: HomeView, meta: { layout: 'DefaultLayout' } },
  { path: '/about', component: AboutView, meta: { layout: 'MinimalLayout' } },
  { path: '/admin', component: AdminLoginView, meta: { layout: 'MinimalLayout' } },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: DashboardHomeView },
      { path: 'notes', component: DashboardNotesView },
      { path: 'notes/new', component: DashboardNoteCreateView },
      { path: 'notes/:id', component: DashboardNoteDetailView },
      { path: 'notes/edit/:id', component: DashboardNoteEditView },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
    meta: { layout: 'MinimalLayout' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  await userStore.loadUser();

  if (to.matched.some((record) => record.meta.requiresAuth) && !userStore.isLoggedIn) {
    return next('/admin');
  }

  next();
});

export default router;
