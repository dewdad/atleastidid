import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ListTasks from '@/views/ListTasks.vue'
import CreateTask from '@/views/CreateTask.vue'

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
    path: '/add-task',
    name: 'create-task',
    component: CreateTask,
    beforeEnter: (to, from, next) => {
      if (store.state.auth.userLoggedIn) next()
      else next('/login') 
    }
  },
  {
    path: '/tasks',
    name: 'list-tasks',
    component: ListTasks,
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
