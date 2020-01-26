export default {
    namespaced: true,
    state: {
        token: null
    },
    getters: {
        loggedIn: (state) => state.token
    },
    mutations: {
        setUserToken (state, token) {
            state.token = token
        }
    },
    actions: {
        setAuthToken ({ commit }, token) {
            window.console.log('Token (in action):', token)
            commit('setUserToken', token)
        }
    }
}