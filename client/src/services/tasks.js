import Api from './api'

export default {
  async toggleCompleted(id, value) {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Cookie': document.cookie
    }
    return Api().post(`/tasks/${id}/complete`, { complete: value }, { headers })
  },
  // async getAddTaskView() {
  //   const headers = {
  //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //     // 'withCredentials': true  
  //   }
  //   return Api().get('/tasks/add', { headers })
  // },
  async createTask(task) {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      // 'Set-Cookie': document.cookie
    }
    window.console.log(headers)
    return Api().post('/tasks', task, { headers })
  },
  async getAllTasks() {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      // 'Set-Cookie': document.cookie
    }
    return Api().get('tasks', { headers })
  },
  async deleteTask(id) {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
    return Api().delete('tasks/' + id, { headers })
  }
}