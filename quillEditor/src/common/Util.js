const Util = {
  checkUrl: function (url) {
    if (url.substr(0, 8).toLowerCase() !== 'https://') {
      return url.substr(0, 7).toLowerCase() === 'http://' ? url : 'http://' + url
    } else {
      return url
    }
  }
}
export default Util
