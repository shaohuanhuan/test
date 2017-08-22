/**
 * @author monkeywang
 * Date: 17/3/27
 */
import axios from 'axios'
class Utils {
  get (url, params) {
    return new Promise(function (resolve, reject) {
      axios.get(url, {
        params: params
      }).then((response) => {
        resolve(response)
      }).catch((error) => {
        resolve(error)
      })
    })
  }
}
export default new Utils()
