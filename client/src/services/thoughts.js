import Api from './api'

export default {
  async createThought(thought) {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    window.console.log(headers)
    return Api().post('/thoughts', thought, { headers })
  },
  async getAllThoughts() {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return Api().get('thoughts', { headers })
  }
}