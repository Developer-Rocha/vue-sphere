import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VUE_SPHERE_API_ENDPOINT || 'https://vue-sphere.ddev.site/jsonapi',
  headers: {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json'
  }
})

apiClient.interceptors.request.use(
  (config) => {
    const token = import.meta.env.VUE_SPHERE_API_TOKEN
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default apiClient
