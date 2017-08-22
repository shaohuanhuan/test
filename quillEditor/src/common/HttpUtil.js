import router from '../router'
import axios from 'axios'
import Vue from 'vue'
var qs = require('qs')

const Utils = {
  get (url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: data,
        withCredentials: true
      })
      .then(function (response) {
        if (response.data.code === 1010) {
          console.log('没有权限')
          console.log(this)
          router.push({ path: '/login' })
        } else if (response.data.code === 0) {
          resolve(response)
        } else {
          console.log('接口返回状态码：' + response.data.code)
          /**
           * 未升级用户，不能访问，请与服务人员联系，申请升级服务！  这句 不提示
           * @param  {[type]} response.data.message !             [description]
           * @return {[type]}                       [description]
           */
          if (response.data.message !== '未升级用户，不能访问，请与服务人员联系，申请升级服务！') {
            new Vue().$message({
              message: response.data.message,
              type: 'error'
            })
            resolve(response)
          } else {
            resolve(response)
          }
        }
      })
      .catch(function (error) {
        reject()
        console.log(error)
      })
    })
  },
  post (url, data = {}, upload = false) {
    return new Promise((resolve, reject) => {
      axios.post(url, upload ? data : qs.stringify(data), {
        withCredentials: true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
      })
      .then(function (response) {
        if (response.data.code === 1010) {
          console.log('没有权限')
        } else if (response.data.code === 0) {
          // console.log(response)
          resolve(response)
        } else {
          console.log('接口返回状态码：' + response.data.code)
          resolve(response)
        }
      })
      .catch(function (error) {
        reject()
        console.log(error)
      })
    })
  }

}

export default Utils
