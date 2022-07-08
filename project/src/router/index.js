import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainView',
    component: () => import('@/views/main/index'),
    children: [
      // {
      //   path: '/home',
      //   name: 'home',
      //   component: () => import('@/views/home/index')
      // },
      // {
      //   path: '/user',
      //   name: 'user',
      //   component: () => import('@/views/user/index')
      // },
      // {
      //   path: '/mall',
      //   name: 'mall',
      //   component: () => import('@/views/mall/index')
      // },
      // {
      //   path: '/pageOne',
      //   name: 'pageOne',
      //   component: () => import('@/views/other/PageOne')
      // },
      // {
      //   path: '/pageTwo',
      //   name: 'pageTwo',
      //   component: () => import('@/views/other/PageTwo')
      // }
    ]
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
