import Api from './api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials, { crossDomain: true })
  },
  logout () {
    return Api().post('logout')
  }
}