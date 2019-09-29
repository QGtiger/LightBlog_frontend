import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $ from 'jquery';
import 'animate.css'
import {WOW} from 'wowjs';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Util from './utils/utils'
// use
Vue.use(mavonEditor)


new WOW({live: false}).init();

Vue.use(ElementUI);
Vue.prototype.$ = $;

Vue.config.productionTip = false

// router.beforeEach((to, from, next)=>{
//   let isLogin = !!localStorage.token
//   if (to.path === '/login' || to.path === '/register') {
//     Util.title(to.meta.title);
//     next()
//   } else {
//     Util.title(to.meta.title);
//     isLogin ? next() : next('/login')
//   }
// })

// router.afterEach((to, from, next)=>{
//   window.scrollTo(0,0);
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
