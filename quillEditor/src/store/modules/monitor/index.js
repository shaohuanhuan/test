import {getters} from './getters'
import {actions} from './actions'
import {mutations} from './mutations'

// initial state
const state = {
  textContent: '',
  isLimit: false,
  index: 0,
  bindingList: [],
  opportunityType: '',
  bindingMail: {},
  timerMonitor: 0,
  mindex: -1
}

export default {
  state,
  getters,
  actions,
  mutations
}
