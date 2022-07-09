import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { getUserInfoAPI } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 1.存储登录成功后,得到的token
    token: '',
    userInfo: {}
  },
  getters: {
    nickname: state => state.userInfo.nickname, // 昵称
    username: state => state.userInfo.username, // 用户名
    user_pic: state => state.userInfo.user_pic // 用户头像
  },
  mutations: {
    // 2.更新token的mutation函数
    updateToken (state, newToken) {
      state.token = newToken
    },
    updateUserInfo (state, val) {
      state.userInfo = val
    }

  },
  actions: {
    async getUserInfoActions (store) {
      const { data: res } = await getUserInfoAPI()
      console.log(res)
      store.commit('updateUserInfo', res.data)
    }
  },
  modules: {
  },
  // 配置为 vuex 的插件
  plugins: [createPersistedState()]
})
