import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/process',
    name: 'process',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ProcessView.vue')
  },
  {
    path: '/multiGrid',
    name: 'multiGrid',
    component: () => import('../views/MultiGridView.vue'),
  },
  {
    path: '/dynamicGrid',
    name: 'dynamicGrid',
    component: () => import('../views/DynamicGridView.vue'),
  },
  {
    path: '/dynamicView',
    name: 'dynamicView',
    component: () => import('../views/DynamicView.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
