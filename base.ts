import axios from 'axios'
import Cookies from 'js-cookie'

const apiClient = axios.create({
  baseURL: process.env.API_URL,
  timeout: 30000
})

apiClient.interceptors.request.use(config => {
  config.headers['Authorization'] = `Bearer ${Cookies.get('auth_token')}`
  return config
})

export default apiClient
