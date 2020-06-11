import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import helpers from './helpers'
import '@/assets/style.css'

Vue.config.productionTip = false

Vue.prototype.$helpers = helpers

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
