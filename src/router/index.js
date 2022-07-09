import Vue from 'vue'
import VueRouter from 'vue-router'
const register = () => import('@/views/register')
const login = () => import('@/views/login')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
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

export default router
