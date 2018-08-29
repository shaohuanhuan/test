import Vue from 'vue'

const timeFormat = (value) => {
  let time = new Date(value)
  let year = time.getFullYear()
  let month = (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1)
  let day = (time.getDate() < 10 ? '0' : '') + time.getDate()
  let hour = (time.getHours() < 10 ? '0' : '') + time.getHours()
  let minute = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes()
  let second = (time.getSeconds() < 10 ? '0' : '') + time.getSeconds()
  return {year, month, day, hour, minute, second}
}
/**
 * 毫秒值 转换成 yyyy-MM-dd:hh:mm:ss
 */
Vue.filter('yMd-hms', (value) => {
  // 返回处理后的值
  if (!value) { return }
  let obj = timeFormat(value)
  return obj.year + '-' + obj.month + '-' + obj.day + ' ' + obj.hour + ':' + obj.minute + ':' + obj.second
})

/**
 * 分 转换成 元
 * @param  {String}   value)
 * @return {[String]}        [description]
 */
Vue.filter('fenToYuan', (value) => {
  return value ? (parseFloat(value) / 100).toFixed(2) : 0.00
})
