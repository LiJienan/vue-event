import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
const register = () => import('@/views/register')
const login = () => import('@/views/login')
const laylout = () => import('@/views/ layout')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: laylout
  },
  {
    name: 'reg',
    path: '/reg',
    component: register
  },
  {
    name: 'login',
    path: '/login',
    component: login
  }
]

const router = new VueRouter({
  routes
})
const whiteList = ['/reg', '/login']
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    if (!store.state.userInfo.username) { // token 这里是全局路由守卫,所以当我们点击退出后也会判断,无token报错所以当token存在时在判断,!store.state.userInfo.username 这句话的意思是 登陆之后 跳转之间页面 不要重复发起请求
      store.dispatch('getUserInfoActions')
    }
    next()
    // next如果强制切换路由地址 会再次走路由守卫
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
