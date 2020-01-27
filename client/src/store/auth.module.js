import UserServices from '@/services/user'

const token = localStorage.getItem('token')
window.console.log('token:', token === 'undefined')

export default {
  namespaced: true,
  state: {
    token: (token !== 'undefined') ? token : null,
    userLoggedIn: (token) ? true : false
  },
  getters: {
    loggedIn: (state) => state.loggedIn
  },
  mutations: {
    setUserToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
      state.userLoggedIn = true
    },
    resetUserToken(state) {
      state.token = null
      localStorage.clear()
      state.userLoggedIn = false
    }
  },
  actions: {
    setAuthToken({ commit }, token) {
      window.console.log('Token (in action):', token)
      commit('setUserToken', token)
    },
    logout({ commit }) {
      commit('resetUserToken')
    },
    async checkUserState({ commit, state }) {
      window.console.log(state.token)
      if (state.token) {
        window.console.log('Checking user state...')
        await UserServices.statUser().then(response => {
          window.console.log('checkUserState (action):', response)
          window.console.log('user is authenticated in system')
        }).catch(err => {
          commit('resetUserToken')
          window.console.log('user is not authenticated in system', err)
        })
      } else {
        window.console.log('ok')
        commit('resetUserToken')
        window.console.log('user is not authenticated in system')
      }
    }
  }
}