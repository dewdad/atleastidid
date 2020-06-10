import axios from 'axios'
var axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE,
  withCredentials: true
})
export default function () {
  axiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
  return axiosInstance
}
