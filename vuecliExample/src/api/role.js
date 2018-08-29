import server from '@/commonjs/server'

const domain = process.env.DOMAIN
const api = {
  /**
   * 角色列表
   */
  roleList (params) {
    // let postUrl = '../static/mock/role.json'
    // return server.get(postUrl, params)
    return server.get(domain + '/v1/roles', params)
  },
  /**
   * 新增角色
   */
  addRole (params) {
    return server.post(domain + '/v1/roles', params)
  },
  /**
   * 编辑角色
   */
  editRole (params) {
    return server.put(domain + `/v1/roles/${params.id}`, params)
  },
  /**
   * 启用/禁用角色
   * isRun 2 禁用/ 1 启用
   */
  runForbidRole (params) {
    return server.patch(domain + `/v1/roles/${params.id}/status/translation/${params.isRun}`)
  },
  /**
   * 删除角色
   */
  delRole (params) {
    return server.delete(domain + `/v1/roles/${params.id}`)
  }

}
export default api
