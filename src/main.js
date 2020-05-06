import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'
import 'animate.css'
import { WOW } from 'wowjs'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Util from './utils/utils'
import Config from './config'
import '@/assets/css/iconfont.css'
import '@/assets/js/iconfont/iconfont.js'
import request from '@/utils/request'
import { VueCropper } from 'vue-cropper'
import { emoji } from './utils/emoji.js'
import LBComments from '@/components/LBComments'
import qs from 'qs'

Vue.use(LBComments)

Vue.prototype.emoji = emoji
Vue.prototype.$qs = qs

Vue.use(VueCropper)

// use
Vue.use(mavonEditor)

new WOW({ live: false }).init()

Vue.use(ElementUI)
Vue.prototype.$axios = request
Vue.prototype.$ = $
Vue.prototype.$config = Config
Vue.prototype.$util = Util
Vue.prototype.$Vue = Vue

Vue.config.productionTip = false

console.log(this)

router.beforeEach((to, from, next) => {
  let isLogin = !!localStorage.token
  if (
    to.path === '/login' ||
    to.path === '/register' ||
    to.path === '/welcome' ||
    to.path === '/resetpass'
  ) {
    Util.title(to.meta.title)
    next()
  } else {
    Util.title(to.meta.title)
    isLogin ? next() : next('/login')
  }
})

router.afterEach((to, from, next) => {
  let dom = document.getElementsByClassName('wrap')[0]
  if (dom) dom.scrollTop = 0
})

Vue.directive('clickoutside', {
  bind: function(el, binding, vnode) {
    function documentHandler(e) {
      if (el.contains(e.target)) {
        return false
      }
      if (binding.expression) {
        // binding.value 执行上下文
        if (typeof binding.value === 'function') {
          binding.value(e)
        }
      }
    }
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  unbind: function() {
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
