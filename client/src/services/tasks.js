import Api from './api'

export default {
  async toggleCompleted(id, value) {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return Api().post(`/tasks/${id}/complete`, { complete: value }, { headers })
  },
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