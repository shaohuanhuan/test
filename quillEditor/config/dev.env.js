var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  IFRAM_DOMAIN: '"localhost"',
  DOMAIN: '"https://server.onloon.cc"',
  API_HOST:'".onloon.com.cn"',
  // DOMAIN: '"http://192.168.61.32:8080"',// 云峰本地
  HOMEPAGE: '"http://localhost:8086"',
  HOMEPAGE_DOMAIN: '"localhost:8086"'
})

