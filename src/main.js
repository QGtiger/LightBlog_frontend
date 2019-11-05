import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $ from 'jquery';
import 'animate.css'
import {WOW} from 'wowjs';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import Util from './utils/utils';
import Config from './config';
import '@/assets/css/iconfont.css';
import request from '@/utils/request';
import {VueCropper} from 'vue-cropper';
import { emoji } from './utils/emoji.js'

Vue.prototype.emoji = emoji


Vue.use(VueCropper)

// use
Vue.use(mavonEditor)


new WOW({live: false}).init();

Vue.use(ElementUI);
Vue.prototype.$axios=request;
Vue.prototype.$ = $;
Vue.prototype.$config = Config;
Vue.prototype.$util = Util;

Vue.config.productionTip = false

router.beforeEach((to, from, next)=>{
  let isLogin = !!localStorage.token
  if (to.path === '/login' || to.path === '/register' || to.path === '/welcome') {
    Util.title(to.meta.title);
    next()
  } else {
    Util.title(to.meta.title);
    isLogin ? next() : next('/login')
  }
})

router.afterEach((to, from, next)=>{
  window.scrollTo(0,0);
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
