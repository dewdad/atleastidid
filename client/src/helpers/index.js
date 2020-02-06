import store from '@/store'

var helpers = {
  loggedIn: function () {
    return store.getters['auth/loggedIn']
  }
}

export default helpers