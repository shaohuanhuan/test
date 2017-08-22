/**
 * @author huahua
 * Date: 17/5/25
 */
import Button from '../packages/button/index.js'

const install = function (Vue) {
  Vue.component(Button.name, Button)
}
// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  install,
  Button
}
