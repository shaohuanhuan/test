// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import TreeView from 'vue-json-tree-view'
import * as filters from './commonjs/filters.js'
// import './commonjs/element-import.js'

Vue.use(ElementUI)
Vue.use(TreeView)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = to.name
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  filters,
  components: { App },
  template: '<App/>'
})
