import axios from 'axios'

export default function () {
  return axios.create({
    baseURL: process.env.VUE_APP_API_BASE,
    withCredentials: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
}