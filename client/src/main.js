import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import helpers from './helpers'

Vue.config.productionTip = false

Vue.prototype.$helpers = helpers

// router.beforeEach((to, from, next) => {
//   store.dispatch('auth/checkUserState')
//   next()
// })

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
