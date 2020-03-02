import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Layout from './layout/layout.vue';
import LayoutManage from './layout/backLayout.vue';


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
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
      redirect: '/welcome',
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
      },{
        path:'/blog/:id',
        name: 'blog',
        component: () => import('@/views/blog/blogDetail.vue'),
        meta: { title: '文章详情' }
      },{
        path: '/column/list',
        name: 'columnList',
        component: () => import('@/views/specialColumn/columnList'),
        meta: { title: '专栏列表' }
      },{
        path: '/theme/list',
        name: 'themeList',
        component: () => import('@/views/specialTheme/themeList'),
        meta: { title: '专题列表' }
      },{
        path: '/theme/blog/:id',
        name: 'themeBlog',
        component: () => import('@/views/specialTheme/themeBlog'),
        meta: { title: '专题文章' }
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
      },{
        path: 'template',
        name: 'template',
        component: () => import('@/views/manage/articleExamine/replayTemplate'),
        meta: { title: '回复模板' }
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
      path: '/report',
      name: 'report',
      component: LayoutManage,
      redirect: '/report/blog',
      children: [{
        path: 'blog',
        component: () => import('@/views/manage/report/blogReport'),
        meta: { title: '文章检举' }
      },{
        path: 'comment',
        component: () => import('@/views/manage/report/commentReport'),
        meta: { title: '评论检举' }
      },{
        path: 'type',
        component: () => import('@/views/manage/report/typeReport'),
        meta: { title: '文章配置' }
      }]
    },
    {
      path: '/lblogauthor',
      name: 'lblogauthor',
      component: LayoutManage,
      redirect: '/lblogauthor/list',
      children: [{
        path: 'list',
        component: () => import('@/views/manage/author/authorList'),
        meta: { title: '用户管理' }
      }]
    },
    {
      path: '/banner',
      name: 'banner',
      component: LayoutManage,
      redirect: '/banner/index',
      children: [{
        path: 'index',
        component: () => import('@/views/manage/carousel/carouselBanner'),
        meta: { title: 'Banner 管理' }
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
      }, {
        path: 'detail',
        name: 'detail',
        component: () => import('@/views/manage/article/articleDetail'),
        meta: { title: '文章详情' }
      },{
        path: 'collection',
        name: 'collection',
        component: () => import('@/views/collection/collection'),
        meta: {title: '收藏夹管理'}
      }]
    },
    {
      path:'/author',
      name: 'author',
      component: Layout,
      redirect: '/404',
      children:[{
        path:'edit',
        name: 'edit',
        component: () => import('@/views/author/authorEdit'),
        meta: {title: '用户编辑'}
      },{
        path: 'detail',
        name: 'detail',
        component: () => import('@/views/author/authorDetail'),
        meta: {title: '用户信息'}
      }]
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
