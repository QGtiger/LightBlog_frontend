import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Layout from './layout/layout.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      component: Home,
      meta: {title: 'Welcome to LightBlog'}
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/markdown',
      name: 'markdown',
      component: () => import('@/components/blog/MarkDownEditor.vue')
    },
    {
      path: '/',
      component: Layout,
      redirect: '/index',
      children: [{
        path: 'index',
        name: 'index',
        component: () => import('@/pages/homePage/homePage.vue'),
        meta: {title: '首页'}
      },{
        path: '404',
        name: '404',
        component: () => import('@/components/404/Page404.vue'),
        meta: {title: '404'}
      }]

    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/account/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/account/Register.vue')
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
