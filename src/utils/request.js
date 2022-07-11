import axios from 'axios'
import store from '@/store'
import router from '@/router'
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

// 定义响应拦截器
myAxios.interceptors.response.use(function (response) {
  // 响应状态码为 2xx 时触发成功的回调，形参中的 response 是“成功的结果”
  return response
}, function (error) {
  // 响应状态码不是 2xx 时触发失败的回调，形参中的 error 是“失败的结果”
  // error对象需要使用console.dir来打印详细信息 用log打印不出来
  console.dir(error)
  if (error.response.status === 401) {
    // 无效的 token
    // 把 Vuex 中的 token 重置为空，并跳转到登录页面
    store.commit('updateToken', '')
    store.commit('updateUserInfo', {})
    router.push('/login')
  }
  return Promise.reject(error)
})

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
