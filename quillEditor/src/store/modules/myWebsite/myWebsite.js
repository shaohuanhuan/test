/**
 * @author monkeywang
 * Date: 17/4/26
 */

// mutations type
const EDITOR_MENU = 'EDITOR_MENU'
const SET_DIRTY = 'SET_DIRTY'
const DOMAIN_COMPANY = 'DOMAIN_COMPANY'
const SEL_MODEL = 'SEL_MODEL'
// initial state
const state = {
  editorMenu: '/',
  domainCompany: {},
  selmodel: '',
  /**
   * 修改过网页
   * @type {Boolean}
   */
  ifDirty: false
}

// getters
const getters = {editorMenu: state => state.editorMenu, ifDirty: state => state.ifDirty, domainCompany: state => state.domainCompany, selmodel: state => state.selmodel}

// actions
const actions = {
}

// mutations
const mutations = {
  [EDITOR_MENU] (state, { menu }) {
    state.editorMenu = menu
  },
  [SET_DIRTY] (state, dirtyState) {
    state.ifDirty = dirtyState
  },
  [DOMAIN_COMPANY] (state, domainCompany) {
    state.domainCompany = domainCompany
  },
  [SEL_MODEL] (state, selmodel) {
    state.selmodel = selmodel
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
