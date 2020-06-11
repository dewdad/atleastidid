import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ListTasks from '@/views/ListTasks.vue'
import SingleTask from '@/views/SingleTask.vue'
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
    component: CreateTask
  },
  {
    path: '/tasks',
    name: 'list-tasks',
    component: ListTasks
  },
  {
    path: '/task/:id',
    name: 'single-task',
    component: SingleTask,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(function (to, from, next) {
  if (store.state.auth.userLoggedIn) {
    store.dispatch('auth/checkUserState')
  } else if (localStorage.getItem('token')) {
    store.commit('auth/resetUserToken')
  }
  next()
})

export default router
