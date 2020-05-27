import store from '@/store'
import './filters'

var helpers = {
  loggedIn: function () {
    return store.getters['auth/loggedIn']
  },
  getPathName (path) {
    return path.slice(1, path.length)
  }
}

export default helpers