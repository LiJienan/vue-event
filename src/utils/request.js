import theAxios from 'axios'
const axios = theAxios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net',
  timeout: 50000
})

export default ({ url, method = 'GET', headers = {}, params = {}, data = {} }) => {
  return axios(
    {
      url,
      method,
      params,
      headers,
      data
    }
  )
}
