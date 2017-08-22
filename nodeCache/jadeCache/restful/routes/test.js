/**
 * @author monkeywang
 * Date: 17/3/27
 */
var HttpRequest = require('../common/utils')
exports.test = (function () {
  return {
    getList: function (req, res) {
      var httpReq = new HttpRequest('/v2/movie/in_theaters', {});
      httpReq.get(function (res) {
        console.log(res)
      })
      res.send({'status': 1, 'msg': 'test'});
    }
  }
})();
