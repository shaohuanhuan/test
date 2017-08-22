/**
 * Created by shaohuan on 2017/4/12.
 * 商品
 */
import HttpUtil from '@/common/HttpUtil'
// import Config from '@/common/config'
// import Vue from 'vue'

const productAPI = {
  /**
   * 商品列表
   */
  getList (params) {
    let data = {size: 10, productStatus: -1, page: 1}
    // data.page = params.page
    Object.assign(data, params)
    let postUrl = process.env.DOMAIN + '/bshop/product/list'
    return HttpUtil.get(postUrl, data)
  },
  /**
   * 商品详情
   */
  getDetail (params) {
    let postUrl = process.env.DOMAIN + '/bshop/product/detail'
    return HttpUtil.get(postUrl, params)
  },
  /**
   * 商品复制
   */
  prodCopy (params) {
    let postUrl = process.env.DOMAIN + '/bshop/product/copy'
    return HttpUtil.get(postUrl, params)
  },
  /**
   * 商品批量删除
   */
  delProdBatch (params) {
    let postUrl = process.env.DOMAIN + '/bshop/product/batchdelete'
    return HttpUtil.get(postUrl, params)
  },
  /**
   * 所有地区
   */
  getPlace () {
    let postUrl = process.env.DOMAIN + '/bshop/config/continent/listwithcountrys'
    return HttpUtil.get(postUrl)
  },
  /**
   * 中国下的所有省
   */
  getProvince () {
    let postUrl = process.env.DOMAIN + '/bshop/config/province/list'
    return HttpUtil.get(postUrl)
  },
  /**
   * 组别
   */
  getGroup () {
    let postUrl = process.env.DOMAIN + '/bshop/product/group/listall'
    return HttpUtil.get(postUrl)
  },
  /**
   * 修改分组
   */
  modGroup (params) {
    let postUrl = process.env.DOMAIN + '/bshop/product/group/moveproducts'
    return HttpUtil.get(postUrl, params)
  },
  /**
   * 分类名
   */
  getCategory (params) {
    let postUrl = process.env.DOMAIN + '/bshop/config/cate/detail'
    return HttpUtil.get(postUrl, params)
  },
  /**
   * 计量单位
   */
  getUnits () {
    let postUrl = process.env.DOMAIN + '/bshop/config/productunit/list'
    return HttpUtil.get(postUrl)
  },
  /**
   * 新增/编辑 商品保存
   */
  saveProduct (data) {
    // console.log(flag, params)
    let postUrl = ''
    if (data.flag === '0') { // 0 新增
      postUrl = process.env.DOMAIN + '/bshop/product/add'
    } else { // 1 编辑
      postUrl = process.env.DOMAIN + '/bshop/product/update'
    }
    return HttpUtil.post(postUrl, data.params)
  },
  /**
   * 新增-类目列表
   */
  category (params) {
    let postUrl = process.env.DOMAIN + '/bshop/config/cate/list'
    return HttpUtil.post(postUrl, params)
  },
  /**
   * 特殊类目有固定属性
   */
  getPropList (params) {
    // let postUrl = '../static/mock/prop.json'
    let postUrl = process.env.DOMAIN + '/bshop/config/property/list'
    return HttpUtil.get(postUrl, params)
  },
  /**
   * 运费模板
   */
  getFreight () {
    let postUrl = process.env.DOMAIN + '/bshop/logistics/freighttemplate/list'
    return HttpUtil.get(postUrl)
  },
  /**
   * 分组和置顶
   */
  topAndGroup (params) {
    let postUrl = process.env.DOMAIN + '/bshop/product/group/moveproducts'
    return HttpUtil.get(postUrl, params)
  },
  upload (params) {
    return HttpUtil.post(process.env.DOMAIN + '/bshop/config/pic/upload', params, true)
    // let postUrl = process.env.DOMAIN + '/bshop/config/pic/upload'
    // return HttpUtil.get(postUrl, params)
  }
}
export default productAPI
