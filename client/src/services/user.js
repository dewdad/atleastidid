import Api from './api'

export default {
    async statUser () {
        let headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        return Api().get('user', { headers })
    }
}