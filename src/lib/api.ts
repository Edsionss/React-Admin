// src/lib/api.ts
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 在 .env 文件中定义
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器：自动附加 Token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiClient