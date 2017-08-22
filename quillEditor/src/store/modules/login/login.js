// mutations type
const SET_USER_INFO = 'SET_USER_INFO'
// initial state
const state = {
  userInfo: {}
}

// getters
const getters = {
  userInfo: state => state.userInfo
}

// actions
const actions = {
}

// mutations
const mutations = {
  [SET_USER_INFO] (state, info) {
    state.userInfo = info
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
