import axios from 'axios'
var axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE,
  withCredentials: true
})
//axiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
export default function () {
  return axiosInstance
}
