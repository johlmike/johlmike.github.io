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
    path: '/product/:id',
    name: 'Product',
    component: () => import('../views/layout/Product.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/layout/Cart.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/layout/About.vue'),
  },
  // 感覺要有使用者登入的畫面，但不在作業範圍內故暫時註解
  // {
  //   path: '/user-login',
  //   name: 'UserLogin',
  //   component: () => import('../views/layout/UserLogin.vue'),
  // },
  // 因為考慮到普遍都會使用 "admin"、"dashboard" 等詞
  // 所以用特殊的名稱命名後台，避免被猜出後台路徑
  // 但我不確定這種作法是否需要，以及是否恰當，故附上註解
  {
    path: '/master-login',
    name: 'MasterLogin',
    component: () => import('../views/AdminLogin.vue'),
  },
  {
    path: '/master-rabbit',
    name: 'Dashboard',
    component: () => import('../views/dashboard/Dashboard.vue'),
    children: [
      {
        path: '/',
        name: 'ProductsManage',
        component: () => import('../views/dashboard/ProductsManage.vue'),
      },
      {
        path: 'coupon-manage',
        name: 'CouponManage',
        component: () => import('../views/dashboard/CouponManage.vue'),
      },
      {
        path: 'order-manage',
        name: 'OrderManage',
        component: () => import('../views/dashboard/OrderManage.vue'),
      },
      {
        path: 'picture-manage',
        name: 'PictureManage',
        component: () => import('../views/dashboard/PictureManage.vue'),
      },
    ],
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
