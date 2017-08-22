export const getters = {
  contactPersonList: state => state.contactPersonList,
  contactPersonCount: state => state.contactPersonCount,
  contactCompanyList: state => state.contactCompanyList,
  contactCompanyCount: state => state.contactCompanyCount,

  contactList: state => {
    return (state.contactType ? state.contactCompanyList : state.contactPersonList)
  },
  contactTotalCount: state => {
    return state.contactType ? state.contactCompanyCount : state.contactPersonCount
  },
  desc: state => state.desc,
  contactTags: state => state.contactTags,
  detailType: state => state.detailType,
  tags: state => state.tags,
  personBasicInfo: state => state.personBasicInfo,
  companyBasicInfo: state => state.companyBasicInfo,
  contactDetail: state => state.contactDetail,
  allParams: state => state.allParams,
  timeLine: state => state.timeLine,
  timeLinePage: state => state.timeLinePage,
  editorPerson: state => state.editorPerson,
  editorCompany: state => state.editorCompany,
  companyDetail: state => state.companyDetail,
  loadingTable: state => state.loadingTable,
  basicLoading: state => state.basicLoading,
  cmpBcLoading: state => state.cmpBcLoading,
  descLoading: state => state.descLoading,
  recordLoading: state => state.recordLoading,
  isAdded: state => state.isAdded
}
