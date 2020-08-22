import Api from './api'

export default {
  async toggleCompleted(id, value) {
    return Api().post(
      `/tasks/${id}/complete`,
      { complete: value },
      { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
    )
  },
  async getAddTaskView() {
    return Api().get('/tasks/add', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
  },
  async createTask(task) {
    return Api().post('/tasks', task, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
  },
  async getAllTasks() {
    return Api().get('tasks', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
  },
  async deleteTask(id) {
    return Api().delete('tasks/' + id, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
  },
  async getTask(id) {
    return Api().get(`task/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
  }
}