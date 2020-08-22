import AuthServices from '@/services/auth'
import UserServices from '@/services/user'

export default {
  namespaced: true,
  state: {
    error: null,
    user: null,
    token: localStorage.getItem('token') || null,
    userLoggedIn: localStorage.getItem('token') ? true : false
  },
  getters: {
    loggedIn: (state) => state.userLoggedIn
  },
  mutations: {
    setUserToken(state, token, user) {
      state.token = token
      state.user = user
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
      return AuthServices.login(credentials).then(response => {

        window.console.debug('(client/src/store/auth.module.js)-[line: #41] response.data =>', response.data)

        localStorage.setItem('token', response.data.token)
        
        commit('notices/addNotice', {
          message: `Welcome, ${response.data.user.email}!`,
          status: response.status,
          type: 'success'
        }, { root: true })
        
        commit('setUserToken', response.data.token, response.data.user)
        
        return response
      }).catch(errorResponse => {
        commit('setLoginError', {
          status: errorResponse.response.data.status,
          message: errorResponse.response.data.message
        })
        return errorResponse
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
        localStorage.setItem('token', state.token)
        await UserServices.statUser().then(response => {
          if (response.data.user) {
            window.console.log('(client/src/store/auth.module.js)-[line: #77] response.data.user =>', response.data.user)
          } else {
            commit('resetUserToken')
          }
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