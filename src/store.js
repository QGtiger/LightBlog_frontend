import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    avatorUrl: '',
  },
  mutations: {
    setUserName(state, username){
      state.username = username;
    },
    setAvatorUrl(state, url){
      state.avatorUrl = url;
    }
  },
  actions: {

  }
})
