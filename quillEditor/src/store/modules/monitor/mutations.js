import * as types from './types'

export const mutations = {
  [types.MONITOR_TEXTAREA] (state, { textContent, isLimit }) {
    state.textContent = textContent
    state.isLimit = isLimit
  },

  [types.MONITOR_IMGINDEX] (state, { index }) {
    state.index = index
  },

  [types.MONITOR_BINDINGLIST] (state, { bindingList }) {
    state.bindingList = bindingList
  },

  [types.MONITOR_BINDINGMAIL] (state, { bindingMail }) {
    state.bindingMail = bindingMail
  },

  [types.MONITOR_OPPORTUNITYTYPE] (state, { opportunityType }) {
    state.opportunityType = opportunityType
  },

  [types.MONITOR_TIMERMONITOR] (state, { timerMonitor, mindex }) {
    state.timerMonitor = timerMonitor
    state.mindex = mindex
  }
}
