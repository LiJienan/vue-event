import Vue from 'vue'
import VueRouter from 'vue-router'
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

export default router
