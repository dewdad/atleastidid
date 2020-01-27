import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import CreateThought from '@/components/CreateThought.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/share-a-thought',
    name: 'create-thought',
    component: CreateThought,
    beforeEnter: (to, from, next) => {
      if (store.state.auth.userLoggedIn) next()
      else next('/login') 
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(function (to, from, next) {
  if (store.state.auth.userLoggedIn) {
    store.dispatch('auth/checkUserState').then(next)
  } else {
    store.dispatch('auth/logout').then(next)
  }
})

export default router
