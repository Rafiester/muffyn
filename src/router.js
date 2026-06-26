import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Login from './components/Admin/Login.vue';
import Dashboard from './views/Dashboard.vue';
import { localCms } from './localCms';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/th3w3b4dm1n/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/th3w3b4dm1n/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuth = localCms.isAuthenticated();
  
  if (to.meta.requiresAuth && !isAuth) {
    next('/th3w3b4dm1n/login');
  } else if (to.name === 'Login' && isAuth) {
    next('/th3w3b4dm1n/dashboard');
  } else {
    next();
  }
});
