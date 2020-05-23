import axios from 'axios'
let axiosOptions = {
  baseURL: process.env.VUE_APP_API_BASE,
}
if (process.env.NODE_ENV === 'production') {
  axiosOptions.withCredentials = true
}
var axiosInstance = axios.create(axiosOptions)
export default function () {
  return axiosInstance
}
