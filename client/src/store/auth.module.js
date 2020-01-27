export default {
  namespaced: true,
  state: {
    token: null,
    userLoggedIn: null
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
    }
  }
}