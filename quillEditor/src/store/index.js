import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login/login'
import logistics from './modules/logistics/logistics'
import channel from './modules/channelDemo/channelDemo'
import product from './modules/product/index'
import monitor from './modules/monitor/index'
import develop from './modules/develop/index'
import contact from './modules/contact/index'
import order from './modules/order/index'
import myWebsite from './modules/myWebsite/myWebsite'
import index from './modules/index/index'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    login,
    logistics,
    channel,
    contact,
    product,
    monitor,
    develop,
    order,
    myWebsite,
    index
  },
  strict: debug
})
