// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'
document.domain = process.env.IFRAM_DOMAIN
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './common/element-import'
import '@/assets/fonts/iconfont.js'
import filters from './common/filters'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)
Vue.config.productionTip = false
/**
 * 路由动态 title
 * @param  {[type]} (to, from,         next [description]
 * @return {[type]}      [description]
 */
router.beforeEach((to, from, next) => {
  document.title = to.name
  if (to.path !== '/login' && !localStorage.userId && to.path !== '/register' && to.path !== '/forgot' && to.path !== '/CreateShop' && to.path !== '/certify') {
    next('/login')
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  filters,
  store,
  template: '<App/>',
  components: { App }
})
