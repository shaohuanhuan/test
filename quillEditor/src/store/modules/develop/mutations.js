import * as types from './types'
import Vue from 'vue'
let vm = new Vue()

export const mutations = {
  [types.DEVELOP_ADDEXTENSION] (state, { isAddExtension }) {
    state.isAddExtension = isAddExtension
  },

  [types.DEVELOP_ADDSUCCESS] (state, { isAddSuccess, sendType }) {
    state.isAddSuccess = isAddSuccess
    state.sendType = sendType
  },

  [types.DEVELOP_EDITEXTENSION] (state, { isEditExtension, detail }) {
    state.isEditExtension = isEditExtension
    if (detail) {
      state.detail = detail
    }
  },

  [types.DEVELOP_EDITSUCCESS] (state, { isEditSuccess }) {
    state.isEditSuccess = isEditSuccess
  },

  [types.DEVELOP_BINDINGLIST] (state, { bindingList }) {
    state.bindingList = bindingList
  },

  [types.DEVELOP_BOARDLIST] (state, { boardList }) {
    state.boardList = boardList
  },

  [types.DEVELOP_CHANGEBINDLIST] (state, { value, index }) {
    vm.$set(state.bindingList[index], 'checked', value)
  },

  [types.DEVELOP_CHANNELTYPE] (state, { channelType }) {
    state.channelType = channelType
  },

  [types.FIND_CONTACTID] (state, { contactId }) {
    state.contactId = contactId
  },

  [types.FIND_COMPANYID] (state, { companyId }) {
    state.companyId = companyId
  },

  [types.DEVELOP_SEARCH_PAGE] (state, { page }) {
    state.searchPage = page
  }
}
