import request from '@/utils/request'
import store from '@/store'
/* request方法调用在原地是一个Promise对象(内部包含原生ajax请求)
* return 这个Promise对象到逻辑页面,去那边对Promise对象提取结果
*  */
/**
 *
 * @param username
 * @param password
 * @param repassword
 * @returns {*}
 */
// 注册接口
export const registerAPI = ({ username, password, repassword }) => request({
  url: '/api/reg',
  method: 'POST',
  data: {
    username,
    password,
    repassword
  }
})
/**
 *
 * @param username
 * @param password
 * @returns {*}
 */
// 登录接口
export const loginAPI = ({ username, password }) => request({
  url: '/api/login',
  method: 'POST',
  data: {
    username,
    password
  }
})
// 获取用户信息接口
export const getUserInfoAPI = () => request({
  url: '/my/userinfo',
  method: 'GET',
  headers: {
    Authorization: store.state.token
  }
})
