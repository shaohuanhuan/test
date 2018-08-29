import server from '@/commonjs/server'

console.log('process,', process)
const domain = process.env.DOMAIN
const api = {
  /**
   * 用户列表
   */
  userList (params) {
    // let postUrl = '../static/mock/user.json'
    // return server.get(postUrl, params)
    return server.get(domain + '/v1/users', params)
  },
  /**
   * 新增用户
   */
  addUser (params) {
    return server.post(domain + '/v1/users', params)
  },
  /**
   * 编辑用户
   */
  editUser (params) {
    return server.put(domain + `/v1/users/${params.id}`, params)
  },
  /**
   * 分配角色
   */
  assignRole (params) {
    return server.put(domain + `/v1/users/${params.id}/roles`, {roles: params.roles})
  },
  /**
   * 角色列表
   */
  roleList (params) {
    // let postUrl = '../static/mock/role.json'
    // return server.get(postUrl, params)
    return server.get(domain + '/v1/roles', params)
  },
  /**
   * 启用/禁用用户
   * isRun 2 禁用/ 1 启用
   */
  runForbidUser (params) {
    return server.patch(domain + `/v1/users/${params.id}/status/translation/${params.isRun}`)
  },
  /**
   * 重置密码
   */
  resetPwd (params) {
    return server.patch(domain + `/v1/users/${params.id}/password`)
  },
  /**
   * 删除用户
   */
  delUser (params) {
    return server.delete(domain + `/v1/users/${params.id}`)
  }
}
export default api
