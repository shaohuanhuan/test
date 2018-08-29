import Vue from 'vue'
import Router from 'vue-router'

const menu = resolve => require(['@/components/menu'], resolve)
const user = resolve => require(['@/views/user'], resolve)
const role = resolve => require(['@/views/role'], resolve)
const html2canvas = resolve => require(['@/views/html2canvas'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'menu',
      component: menu,
      children: [
        {
          path: '/user',
          name: '用户管理',
          component: user
        },
        {
          path: '/role',
          name: '角色管理',
          component: role
        }
      ]
    },
    {
      path: '/html2canvas',
      component: html2canvas
    }
  ]
})
