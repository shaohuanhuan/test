import axios from 'axios'
import Vue from 'vue'
var qs = require('qs')

const Utils = {
  get (url, data = {}) {
    return new Promise((resolve, reject) => {
      let _this = this
      axios.get(url, {
        params: data,
        withCredentials: true
      }).then(function (resp) {
        _this.dealResponse(resp, resolve)
      }).catch(function (error) {
        reject(error)
        console.log(error)
      })
    })
  },
  post (url, data = {}, upload = false) {
    return new Promise((resolve, reject) => {
      let _this = this
      axios.post(url, upload ? qs.stringify(data) : data, {
        withCredentials: true,
        headers: {'Content-Type': 'application/json; charset=UTF-8'}
      }).then(function (resp) {
        _this.dealResponse(resp, resolve)
      }).catch(function (error) {
        reject(error)
        console.log(error)
      })
    })
  },
  put (url, data = {}) {
    return new Promise((resolve, reject) => {
      let _this = this
      axios.put(url, data, {
        withCredentials: true,
        headers: {'Content-Type': 'application/json; charset=UTF-8'}
      }).then(function (resp) {
        _this.dealResponse(resp, resolve)
      }).catch(function (error) {
        reject(error)
      })
    })
  },
  delete (url, data = {}) {
    return new Promise((resolve, reject) => {
      let _this = this
      axios.delete(url, data, {
        withCredentials: true
      }).then(function (resp) {
        _this.dealResponse(resp, resolve)
      }).catch(function (error) {
        reject(error)
      })
    })
  },
  patch (url, data = '') {
    return new Promise((resolve, reject) => {
      let _this = this
      axios.patch(url, data, {
        withCredentials: true
      }).then(function (resp) {
        _this.dealResponse(resp, resolve)
      }).catch(function (error) {
        reject(error)
      })
    })
  },
  dealResponse (response, resolve) {
    if (response.data.code === 200) {
      resolve(response)
    } else {
      new Vue().$message({
        message: response.data.msg,
        type: 'error'
      })
      resolve(response)
    }
  }
}

export default Utils
