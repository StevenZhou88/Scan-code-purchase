import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/admin/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/catrgory',
      name: 'catrgory',
      component: () => import('./views/admin/product/Catrgory.vue')
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('./views/admin/product/Product.vue')
    },
    {
      path: '/product/product_new',
      name: 'product_new',
      component: () => import('./views/admin/product/Product_new.vue')
    },
    {
      path: '/product/product_edit/:id',
      name: 'product_edit',
      component: () => import('./views/admin/product/Product_edit.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/admin/user/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/admin/user/register.vue')
    }
  ]
})
