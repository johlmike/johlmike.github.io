import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/layout/Home.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/layout/Cart.vue'),
  },
  {
    path: '/master-rabbit',
    name: 'Dashboard',
    component: () => import('../views/dashboard/Dashboard.vue'),
  },
];

const router = new VueRouter({
  routes,
  // 每次切換頁面時，將畫面移回頂部
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
