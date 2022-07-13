import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainView',
    component: () => import('@/views/main/index')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  }
]
const router = new VueRouter({
  mode: 'history',
  routes
})
// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
