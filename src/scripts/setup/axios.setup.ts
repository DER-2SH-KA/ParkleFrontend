import axios from 'axios'

export function axiosSetup(): void {
  axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL
  axios.defaults.timeout = 10000
  axios.defaults.withCredentials = true
}
