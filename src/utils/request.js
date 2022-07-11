import axios from 'axios'
import store from '@/store'
const myAxios = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net',
  timeout: 50000
})
myAxios.interceptors.request.use(config => {
  if (store.state.token) {
    config.headers.Authorization = store.state.token
  }
  return config
}, error => Promise.reject(error))

export default ({ url, method = 'GET', headers = {}, params = {}, data = {} }) => {
  return myAxios(
    {
      url,
      method,
      params,
      headers,
      data
    }
  )
}
