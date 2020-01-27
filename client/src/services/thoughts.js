import Api from './api'

export default {
    async getAllThoughts () {
        let headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        return Api().get('thoughts', { headers })
    }
}