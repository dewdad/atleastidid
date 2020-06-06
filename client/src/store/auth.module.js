import AuthServices from '@/services/auth'
import UserServices from '@/services/user'

const token = localStorage.getItem('token')

export default {
  namespaced: true,
  state: {
    error: null,
    user: null,
    token: (token !== 'undefined') ? token : null,
    userLoggedIn: (token) ? true : false
  },
  getters: {
    loggedIn: (state) => state.userLoggedIn
  },
  mutations: {
    setUserToken(state, token, user) {
      state.token = token
      state.user = user
      localStorage.setItem('token', token)
      state.userLoggedIn = true
    },
    setLoginError(state, error) {
      state.error = error
    },
    resetUserToken(state) {
      state.token = null
      state.user = null
      localStorage.clear()
      state.userLoggedIn = false
    },
  },
  actions: {
    setAuthToken({ commit }, token) {
      commit('setUserToken', token)
    },
    login({ state, commit }, credentials) {
      state.error = null
      commit('resetUserToken')
      commit('notices/clearNotices', null, { root: true })
      AuthServices.login(credentials).then(response => {
        if (response.status == 200) {
          commit('notices/addNotice', {
            message: `Welcome, ${response.data.user.email}!`,
            status: response.status,
            type: 'success'
          }, { root: true })
          commit('setUserToken', response.data.token, response.data.user)
        }
      }).catch(errorResponse => {
        const error = {
          status: errorResponse.response.data.status,
          message: errorResponse.response.data.message
        }
        commit('setLoginError', error)
      })
    },
    async logout({ commit }) {
      commit('resetUserToken')
      commit('notices/clearNotices', null, { root: true })
      await AuthServices.logout().then(response => {
        if (response.status === 200) {
          window.console.log('Logout POST request successful:', response.data)
        }
      }).catch(err => {
        window.console.error('auth/logout', err)
      })
    },
    async checkUserState({ commit, state }) {
      if (state.token) {
        await UserServices.statUser().then(response => {
          window.console.log('checkUserState (action):', response)
          window.console.log('user is authenticated in system')
        }).catch(err => {
          commit('resetUserToken')
          window.console.log('user is not authenticated in system', err)
        })
      } else {
        commit('resetUserToken')
        window.console.log('user is not authenticated in system')
      }
    }
  }
}