import AuthServices from '@/services/auth'
import UserServices from '@/services/user'

const token = localStorage.getItem('token')

export default {
  namespaced: true,
  state: {
    error: null,
    token: (token !== 'undefined') ? token : null,
    userLoggedIn: (token) ? true : false
  },
  getters: {
    loggedIn: (state) => state.userLoggedIn
  },
  mutations: {
    setUserToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
      state.userLoggedIn = true
    },
    setLoginError(state, error) {
      state.error = error
    },
    resetUserToken(state) {
      state.token = null
      localStorage.clear()
      state.userLoggedIn = false
    }
  },
  actions: {
    setAuthToken({ commit }, token) {
      commit('setUserToken', token)
    },
    async login({ state, commit }, credentials) {
      state.error = null
      commit('resetUserToken')
      commit('notices/clearNotices', null, { root: true })
      await AuthServices.login(credentials).then(response => {
        if (response.status === 200) {
          commit('notices/addNotice', {
            message: `Welcome, ${response.data.user.email}!`
          }, { root: true })
          commit('setUserToken', response.data.token)
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