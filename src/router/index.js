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
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    store.dispatch('getUserInfoActions')
  }
  next()
})

export default router
