import Api from './api'

const DEFAULT_HEADERS = {
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
}
export default {
  async toggleCompleted(id, value) {
    DEFAULT_HEADERS['Cookie'] = document.cookie
    return Api().post(
      `/tasks/${id}/complete`,
      { complete: value },
      { headers: DEFAULT_HEADERS }
    )
  },
  async getAddTaskView() {
    return Api().get('/tasks/add', { headers: DEFAULT_HEADERS })
  },
  async createTask(task) {
    return Api().post('/tasks', task, { headers: DEFAULT_HEADERS })
  },
  async getAllTasks() {
    return Api().get('tasks', { headers: DEFAULT_HEADERS })
  },
  async deleteTask(id) {
    return Api().delete('tasks/' + id, { headers: DEFAULT_HEADERS })
  },
  async getTask(id) {
    return Api().get(`task/${id}`, { headers: DEFAULT_HEADERS })
  }
}