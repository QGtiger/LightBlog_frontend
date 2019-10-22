import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Layout from './layout/layout.vue';
import LayoutManage from './layout/backLayout.vue';

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
        meta: {title: '首页', index: '1'}
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
      path: '/manage',
      name: 'manage',
      component: LayoutManage,
      redirect: '/manage/index',
      children: [{
        path: 'index',
        name: 'index',
        component: () => import('@/views/manage/welcome'),
        meta: { title: '欢迎来到后台管理'}
      },{
        path: 'examine',
        name: 'examine',
        component: () => import('@/views/manage/articleExamine/article'),
        meta: { title: '文章审核' }
      },{
        path: 'check',
        name: 'check',
        component: () => import('@/views/manage/articleExamine/articleCheck'),
        meta: { title: '文章审核' }
      }]
    },
    {
      path: '/specialcolumn',
      name: 'specialcolumn',
      component: LayoutManage,
      redirect: '/specialcolumn/index',
      children: [{
        path: 'index',
        name: 'index',
        component: () => import('@/views/manage/specialColumn/specialcolumn'),
        meta: { title: '专栏管理' }
      },{
        path: 'add',
        name: 'add',
        component: () => import('@/views/manage/specialColumn/addcolumn'),
        meta: { title: '新增专栏' }
      },{
        path: 'update',
        name: 'update',
        component: () => import('@/views/manage/specialColumn/addcolumn'),
        meta: { title: '编辑专栏' }
      }]
    },
    {
      path: '/specialtheme',
      name: 'specialtheme',
      component: LayoutManage,
      redirect: '/specialtheme/index',
      children:[{
        path: 'index',
        name: 'index',
        component: () => import('@/views/manage/specialTheme/specialtheme'),
        meta: { title: '专题管理' }
      },{
        path: 'add',
        name: 'add',
        component: () => import('@/views/manage/specialTheme/addtheme'),
        meta: { title: '新增专题' }
      },{
        path: 'update',
        name: 'update',
        component: () => import('@/views/manage/specialTheme/addtheme'),
        meta: { title: '编辑专题' }
      }]
    },
    {
      path: '/personalcolumn',
      name: 'personalcolumn',
      component: LayoutManage,
      redirect: '/personalcolumn/index',
      children: [{
        path: 'index',
        name: 'index',
        component: () => import('@/views/manage/personalColumn/personalColumn'),
        meta: { title: '个人专栏' }
      },{
        path: 'add',
        name: 'add',
        component: () => import('@/views/manage/personalColumn/addUpdateColumn'),
        meta: { title: '新增个人专栏' }
      },{
        path: 'update',
        name: 'update',
        component: () => import('@/views/manage/personalColumn/addUpdateColumn'),
        meta: { title: '编辑个人专栏' }
      }]
    },
    {
      path:'/article',
      name: 'article',
      component: LayoutManage,
      redirect: '/article/index',
      children: [{
        path: 'index',
        name: 'index',
        component: () => import('@/views/manage/article/articleList'),
        meta: { title: '文章列表' }
      },{
        path: 'add',
        name: 'add',
        component: () => import('@/views/manage/article/addUpdateArticle'),
        meta: { title: '新增文章' }
      }, {
        path: 'update',
        name: 'update',
        component: () => import('@/views/manage/article/addUpdateArticle'),
        meta: { title: '编辑文章' }
      }]
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
