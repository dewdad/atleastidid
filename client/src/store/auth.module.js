import UserServices from '@/services/user'

const token = localStorage.getItem('token')
window.console.log('token:', token)

export default {
  namespaced: true,
  state: {
    token: (token !== undefined) ? token : null,
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
    async checkUserState({ commit }) {
      // try {
      if (localStorage.getItem('token')) {
        window.console.log('Checking user state...')
        await UserServices.statUser().then(response => {
          window.console.log('checkUserState (action):', response)
        })
        // if (response.status === 200) {
        //   commit('setUserToken', response.data.token)
        //   alert('user is authenticated in system')
        // }
      } else {
        commit('resetUserToken')
        alert('user is not authenticated in system')
      }
      // } catch (err) {
      //   window.console.log(err)
      // }

    }
  }
}