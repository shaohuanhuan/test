import * as types from '../../mutation-types'

const state = {
  firstNav: '' // 一级菜单选中
}

const getters = {
  firstNav: state => state.firstNav
}

const mutations = {
  [types.FIRSTNAV] (state, { rec }) {
    state.firstNav = rec
  }
}

const actions = {
  setNavIndex ({ commit }, rec) {
    commit(types.FIRSTNAV, { rec })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
