import channelAPI from '../../../api/channelAPI'

// mutations type
const CHANNEL_LIST = 'CHANNEL_LIST'
const UPDATE_BINDINGTAG = 'UPDATE_BINDINGTAG'
const UPDATE_ISSUCCESS = 'UPDATE_ISSUCCESS'
// initial state
const state = {
  channelList: [],
  isSuccess: '',
  bindingTag: 0,
  bindIndex: 0
}

// getters
const getters = {channelList: state => state.channelList}

// actions
const actions = {
  getChannelList ({ commit }) {
    channelAPI.getAllChannel().then((res) => {
      commit('CHANNEL_LIST', {res})
    })
  }
}

// mutations
const mutations = {
  [CHANNEL_LIST] (state, { res }) {
    state.channelList = res.data.data
  },
  [UPDATE_BINDINGTAG] (state, {bindIndex, bindingTag}) {
    state.channelList[bindIndex].bindingTag = bindingTag
  },
  [UPDATE_ISSUCCESS] (state, {isSuccess}) {
    state.isSuccess = isSuccess
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
