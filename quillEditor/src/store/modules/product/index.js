import proApi from '../../../api/productApi'
import * as types from '../../mutation-types'

const state = {
  productList: {},
  // productDetail: {},
  places: [],
  groups: [],
  produnits: [],
  cateone: [],
  catetwo: [],
  catethree: [],
  loading: true
}

const getters = {
  productList: state => state.productList,
  // productDetail: state => state.productDetail,
  places: state => state.places,
  groups: state => state.groups,
  produnits: state => state.produnits,
  cateone: state => state.cateone,
  catetwo: state => state.catetwo,
  catethree: state => state.catethree,
  loading: state => state.loading
}

const mutations = {
  [types.PRODUCTS] (state, { rec }) {
    state.productList = rec
  },
  // [types.PRODUCTS_DETAIL] (state, { res }) {
  //   state.productDetail = res.data.data
  // },
  [types.PLACES] (state, { res }) {
    let arrs = []
    res.data.data.forEach(function (v) {
      v.countrys.forEach(function (data) {
        arrs.push(data)
      })
    })
    state.places = arrs
  },
  [types.PROD_GROUP] (state, { res }) {
    state.groups = res.data.data
  },
  [types.PROD_UNITS] (state, { res }) {
    state.produnits = res.data.data
  },
  [types.PROD_CATEONE] (state, { res }) {
    state.cateone = res.data.data
  },
  [types.PROD_CATETWO] (state, { res }) {
    state.catetwo = res.data.data
  },
  [types.PROD_CATETHREE] (state, { res }) {
    state.catethree = res.data.data
  },
  [types.PROD_LOAD] (state, {loading}) {
    state.loading = loading
  }
}
const actions = {
  getProductList ({ commit }, params) {
    proApi.getList(params).then(res => {
      let rec = res.data.data
      commit(types.PRODUCTS, { rec })
      commit(types.PROD_LOAD, {loading: false})
    })
  },
  // getProductDetail ({ commit }, productId) {
  //   proApi.getDetail({productId: productId}).then(res => {
  //     commit(types.PRODUCTS_DETAIL, { res })
  //   })
  // },
  getPlace ({ commit }) {
    proApi.getPlace().then(res => {
      commit(types.PLACES, { res })
    })
  },
  getGroup ({ commit }) {
    proApi.getGroup().then(res => {
      commit(types.PROD_GROUP, { res })
    })
  },
  getUnitList ({ commit }) {
    proApi.getUnits().then(res => {
      commit(types.PROD_UNITS, { res })
    })
  },
  getCate ({ commit }) {
    proApi.category().then(res => {
      commit(types.PROD_CATEONE, { res })
    })
  },
  getCate2 ({ commit }, parentId) {
    proApi.category(parentId).then(res => {
      commit(types.PROD_CATETWO, { res })
    })
  },
  getCate3 ({ commit }, parentId) {
    proApi.category(parentId).then(res => {
      commit(types.PROD_CATETHREE, { res })
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
