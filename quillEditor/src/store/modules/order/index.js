import orderApi from '../../../api/orderApi'
import * as types from '../../mutation-types'

const state = {
  orderList: {},
  // orderInfo: {},
  comps: {},
  logisList: []
}

const getters = {
  orderList: state => state.orderList,
  // orderInfo: state => state.orderInfo,
  comps: state => state.comps,
  logisList: state => state.logisList
}

const mutations = {
  [types.ORDERLIST] (state, { rec }) {
    state.orderList = rec
  },
  // [types.ORDERINFO] (state, { rec }) {
  //   state.orderInfo = rec
  // },
  [types.ORDERCOMP] (state, { rec }) {
    state.comps = rec
  },
  [types.ORDERWAYBILL] (state, { rec }) {
    state.logisList = rec
  }
}

const actions = {
  getOrderList ({ commit }, params) {
    orderApi.getList(params).then(res => {
      let rec = res.data.data
      commit(types.ORDERLIST, { rec })
      commit(types.PROD_LOAD, {loading: false})
    })
  },
  // getOrderInfo ({ commit }, orderCode) {
  //   orderApi.getInfo({orderCode: orderCode}).then(res => {
  //     let rec = res.data.data
  //     let item = rec.itemList
  //     for (let i = 0, len = item.length; i < len; i++) {
  //       rec.itemList[i].formnum = 0
  //     }
  //     commit(types.ORDERINFO, { rec })
  //     if (rec.logistNum) {
  //       actions.getLogistList({ commit }, rec.logistNum)
  //     }
  //   })
  // },
  getComp ({ commit }) {
    orderApi.getCompanys({'dictCode': 'LOGISTICS_TYPE'}).then(res => {
      let rec = res.data.data
      rec.push({dictdataName: '其他', id: 0})
      commit(types.ORDERCOMP, { rec })
    })
  },
  getLogistList ({ commit }, expressNo) {
    orderApi.getLogistList({expressNo: expressNo}).then(res => {
      let rec = res.data.data
      commit(types.ORDERWAYBILL, { rec })
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
