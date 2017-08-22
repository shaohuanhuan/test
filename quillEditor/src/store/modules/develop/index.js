import {getters} from './getters'
import {actions} from './actions'
import {mutations} from './mutations'

// initial state
const state = {
  isAddExtension: false,
  isAddSuccess: false,
  sendType: -1,
  isEditExtension: false,
  isEditSuccess: false,
  detail: {},
  bindingList: [],
  boardList: [],
  channelType: '',
  contactId: '',
  companyId: '',
  searchPage: 1
}

export default {
  state,
  getters,
  actions,
  mutations
}
