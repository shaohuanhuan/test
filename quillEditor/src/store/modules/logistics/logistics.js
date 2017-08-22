// mutations type
const SET_LOGISTICS_INFO = 'SET_LOGISTICS_INFO'
const SET_FROM_PAGE = 'SET_FROM_PAGE'
const SET_EDIT_INDEX = 'SET_EDIT_INDEX'
const DELETE_TEMP_I = 'DELETE_TEMP_I'
const CACHE_ZHOUS = 'CACHE_ZHOUS'
// initial state
const state = {
  /**
   * 编辑物流模板 请求出来的物流模板信息和表格
   * @type {Object}
   */
  logisticsInfo: {},
  /**
   * 设置地址界面来源： new 模板页，edit 编辑按钮，add 新增运费组合
   * @type {String}
   */
  fromPage: '',
  /**
   * 缓存洲对象
   * @type {Array}
   */
  vuexZhous: [],
  /**
   * 传递过来的索引（如果点击的是编辑按钮）
   * @type {Number}
   */
  editIndex: 0
}

// getters
const getters = {
  logisticsInfo: state => state.logisticsInfo,
  fromPage: state => state.fromPage,
  vuexZhous: state => state.vuexZhous,
  editIndex: state => state.editIndex
}

// actions
const actions = {
}

// mutations
const mutations = {
  [SET_LOGISTICS_INFO] (state, info) {
    state.logisticsInfo = info
  },
  [CACHE_ZHOUS] (state, zhous) {
    state.vuexZhous = zhous
  },
  [DELETE_TEMP_I] (state, i) {
    state.logisticsInfo.logistFreightDetails[i].deleteTag = 1
  },
  [SET_EDIT_INDEX] (state, i) {
    state.editIndex = i
  },
  [SET_FROM_PAGE] (state, from) {
    state.fromPage = from
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
