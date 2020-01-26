import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth.module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'ThoughtSub'
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth
  }
})
