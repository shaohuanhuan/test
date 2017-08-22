import {getters} from './getters'
import {actions} from './actions'
import {mutations} from './mutations'

// initial state
const state = {
  contactPersonList: [], // 联系人列表
  contactPersonCount: 0, // 联系人列表数目
  contactCompanyList: [], // 公司列表
  contactCompanyCount: 0, // 公司列表数目
  contactType: 0,        // 类型
  loadingTable: false, // 加载table列表
  basicLoading: false,  // 加载联系人基本信息
  cmpBcLoading: false, // 加载公司基本信息
  descLoading: false, // 加载联系详情
  tagLoading: false, // 标签加载
  recordLoading: false, // 记录加载

  contactId: '', // 联系人/公司的Id
  detailType: '', // 详情类型
  desc: {}, // 详情描述
  personBasicInfo: [], // 联系人基本信息
  companyBasicInfo: [], // 联系公司基本信息
  contactTags: [], // 联系详情标签
  tags: [], // 标签集合
  contactDetail: {
    base: {},
    social: [],
    contact: [],
    stage: [],
    system: []
  }, // 联系人详情
  timeLine: [], // 联系时间线
  /**
   * 时间线 分页对象
   * @type {Object}
   */
  timeLinePage: {
    totalPages: -1,
    page: -1
  }, // 联系时间线
  editorPerson: {}, // 编辑的联系人对象
  editorCompany: {}, // 编辑的公司对象
  companyDetail: {
    base: {},
    social: [],
    contact: [],
    stage: [],
    system: []
  }, // 公司详情

  allParams: [], // 所有信息
  isAdded: false, // 是刷新新增显示属性

  showMsgBtn: false, // 是否显示消息按钮
  filterText: '' // 过滤属性
}

export default {
  state,
  getters,
  actions,
  mutations
}
