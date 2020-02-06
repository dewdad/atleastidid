import Api from './api'

export default {
  async createTask(task) {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    window.console.log(headers)
    return Api().post('/tasks', task, { headers })
  },
  async getAllTasks() {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return Api().get('tasks', { headers })
  },
  async deleteTask(id) {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return Api().delete('tasks/' + id, { headers })
  }
}