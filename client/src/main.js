import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

sync(store, router)

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')) {
    store.dispatch('auth/checkUserState').then(next)
  } else next()
})

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
