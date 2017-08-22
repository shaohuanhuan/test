import Vue from 'vue'
/**
 * 毫秒值 转换成 年月日
 * @param  {Date}   value) {               let time [description]
 * @return {[type]}        [description]
 */
Vue.filter('time-formater-no-hour', (value) => {
  if (!value || value === '') {
    return ''
  }
  // 返回处理后的值
  let time = new Date(value)
  let year = time.getFullYear()
  let month = (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1)
  let day = (time.getDate() < 10 ? '0' : '') + time.getDate()
  return year + '-' + month + '-' + day
})
/**
 * 阶段
 * {name: "成功", value: "won"}
1
:
{name: "潜在", value: "potential"}
2
:
{name: "意向", value: "intention"}
3
:
{name: "跟进", value: "following"}
4
:
{name: "失败", value: "failed"}
5
:
{name: "样品", value: "demo"}
 * @param  {[type]} 'time-formater-no-hour' [description]
 * @param  {[type]} (value                  [description]
 * @return {[type]}                         [description]
 */
Vue.filter('stageFilter', (value) => {
  var obj = {
    following: '跟进',
    won: '成功',
    potential: '潜在',
    intention: '意向',
    failed: '失败',
    demo: '样品'
  }
  return (obj[value] || '未知阶段')
})

/**
 * 毫秒值 转换成 年月日 时分
 * @param  {Date}   value) {               let time [description]
 * @return {[type]}        [description]
 */
Vue.filter('time-formater-has-hour', (value) => {
  // 返回处理后的值
  let time = new Date(value)
  let year = time.getFullYear()
  let month = (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1)
  let day = (time.getDate() < 10 ? '0' : '') + time.getDate()
  let hour = (time.getHours() < 10 ? '0' : '') + time.getHours()
  let minute = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes()
  let second = (time.getSeconds() < 10 ? '0' : '') + time.getSeconds()
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
})
/**
 * 毫秒值 转换成 时分
 */
Vue.filter('time-formater-only-hour', (value) => {
  let time = new Date(value)
  let hour = (time.getHours() < 10 ? '0' : '') + time.getHours()
  let minute = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes()
  let second = (time.getSeconds() < 10 ? '0' : '') + time.getSeconds()
  return hour + ':' + minute + ':' + second
})
/**
 * 分 转换成 元
 * @param  {String}   value)
 * @return {[String]}        [description]
 */
Vue.filter('fenToYuan', (value) => {
  return (parseFloat(value) / 100).toFixed(2)
})
/**
 * 把单位中文转换成英文
 * @return {[type]} [description]
 */
// 日期单位
Vue.filter('dayUnitEn', (value) => {
  let map = {'2': 'Day', '0': 'Week', '1': 'Month'}
  return map[value]
})

// 商品单位
Vue.filter('prodUnitEn', (value) => {
// console.log(value, _this.produnits)
// let en = ''
// for (let item of _this.produnits) {
//   // console.log(item.id)
//   if (item.productUnitEn === value) {
//     en = item.productUnitEn
//     break
//   }
// }
  return value
})

Vue.filter('search-target', (value, searchText, textClass) => {
  function replaceReg (reg, str) {
    return str.replace(reg, (m) => {
      return '<span class="' + textClass + '">' + m + '</span>'
    })
  }
  let strRegex = '' + searchText
  let regex = new RegExp(strRegex, 'gi')
  value = replaceReg(regex, value)
  return value
})
