var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  IFRAM_DOMAIN: '"onloon.com.cn"',
  DOMAIN: '"https://server.onloon.com.cn"',
  API_HOST: '".onloon.com.cn"',
  HOMEPAGE: '"https://buyer.onloon.com.cn"',
  HOMEPAGE_DOMAIN: '"buyer.onloon.com.cn"'
})
