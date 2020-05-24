import Api from './api'

export default {
  async statUser () {
    let headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Set-Cookie': document.cookie
    }
    return Api().get('user', { headers })
  }
}