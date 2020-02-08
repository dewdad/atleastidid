export default {
  namespaced: true,
  state: {
    notices: []
  },
  getters: {
    notices: state => state.notices
  },
  mutations: {
    addNotice(state, notice) {
      state.notices.push(notice)
    },
    clearNotices(state) {
      state.notices = []
    }
  },
}