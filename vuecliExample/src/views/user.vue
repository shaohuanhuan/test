<template>
  <section>
    <div class="search-box">
      <div class="search-item">
        <label>用户名：</label>
        <el-input v-model="username"  @keyup.enter.native="search"></el-input>
      </div>
      <el-button @click="search">搜索</el-button>
      <el-button type="primary" class="btn-add" @click="showAdd">新增用户</el-button>
    </div>
    <div class="table-box">
       <el-table
        :data="tableData"
        style="width: 100%"
        v-loading.body="listLoading"
        element-loading-text="loading">
          <el-table-column
            prop="id"
            label="编号"
            width="80"
            fixed>
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            width="120"
            fixed>
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="昵称"
            width="80">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="180">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="移动电话号码"
            width="180">
          </el-table-column>
          <el-table-column
            prop="source"
            label="注册来源"
            width="120">
            <template slot-scope="scope">
              <div>{{sourceMap[scope.row.source]}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="roleNames"
            label="角色"
            width="120">
            <template slot-scope="scope">
              <div v-if="scope.row.roleNames">
                <p class="ellipsis" :title="item" v-for="item in scope.row.roleNames.split(',')"
                  :key="item">{{item}}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="激活状态"
            width="80">
            <template slot-scope="scope">
              <div>{{statusMap[scope.row.status]}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="180">
            <template slot-scope="scope">
              <div>{{scope.row.createTime | yMd-hms}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="修改时间"
            width="180">
            <template slot-scope="scope">
              <div>{{scope.row.updateTime | yMd-hms}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            width="350">
            <template slot-scope="scope">
              <div>
                <el-button type="text" @click="showEdit(scope.row, 1)">查看</el-button>
                <el-button type="text" @click="showEdit(scope.row, 0)">编辑</el-button>
                <el-button type="text" @click="showAssignRole(scope.row)">角色分配</el-button>
                <!-- <el-button type="text" @click="showAssignRole(scope.row)">启用</el-button>
                <el-button type="text" @click="showAssignRole(scope.row)">禁用</el-button> -->
                <el-button type="text" @click="delUser(scope.row)">删除</el-button>
                <el-button type="text" @click="resetPwd(scope.row)">重置密码</el-button>
                <el-tooltip content="启用/禁用">
                  <el-switch
                    v-model="scope.row.userStatus"
                    :disabled="scope.row.status === 0"
                    @change="runForbidUser(scope.row)"
                    active-color="#13ce66"
                    inactive-color="#ddd">
                  </el-switch>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="page.total"
          :page-size="page.size"
          layout="prev, pager, next"
          :total="page.total"
          @current-change="pageChange">
        </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogAdd" @close="clearRoleForm">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="移动电话号码" prop="mobile">
          <el-input v-model="form.mobile" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="加密方式" prop="encryptType">
          <el-select v-model="form.encryptType">
            <el-option value="MD5" label="MD5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!isModify">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <!-- <el-form-item label="密码盐">
          <el-input v-model="form.salt"></el-input>
        </el-form-item> -->
        <el-form-item label="注册来源">
          <el-select v-model="form.source">
            <el-option :value="0" label="后台注册"></el-option>
            <el-option :value="1" label="运营商"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer">
        <el-button @click="dialogAdd = false">取 消</el-button>
        <el-button type="primary" @click="addOk">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogDetail">
      <el-form>
        <el-form-item label="邮箱">
          {{form.email}}
        </el-form-item>
        <el-form-item label="移动电话号码">
         {{form.mobile}}
        </el-form-item>
        <el-form-item label="用户名">
          {{form.username}}
        </el-form-item>
        <el-form-item label="昵称">
          {{form.nickname}}
        </el-form-item>
        <el-form-item label="加密方式">
          {{form.encryptType}}
        </el-form-item>
        <!-- <el-form-item label="密码">
          {{form.password}}
        </el-form-item> -->
        <!-- <el-form-item label="密码盐">
          {{form.salt}}
        </el-form-item> -->
        <el-form-item label="注册来源">
          {{sourceMap[form.source]}}
        </el-form-item>
        <el-form-item label="角色分配">
        <div v-if="form.roleNames">
          <p :title="item" v-for="item in form.roleNames.split(',')"
            :key="item">{{item}}
          </p>
        </div>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="dialogDetail = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogRole" class="dialog-transfer">
      <el-transfer
      :titles="['角色列表', '已选择']"
      v-model="roleChosen"
      :data="roleList">
      </el-transfer>
      <div slot="footer">
        <el-button @click="dialogRole = false">取 消</el-button>
        <el-button type="primary" @click="assignRoleOk()">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import api from '@/api/user'
export default {
  name: 'user',
  data () {
    // const generateData = _ => {
    //   const data = []
    //   for (let i = 1; i <= 5; i++) {
    //     data.push({
    //       key: i,
    //       label: `备选项 ${i}`,
    //       disabled: i % 4 === 0
    //     })
    //   }
    //   return data
    // }
    return {
      listLoading: false,
      tableData: [],
      form: {
        email: '',
        encryptType: 'MD5',
        source: 0
      },
      username: '',
      page: {currentPage: 1, size: 10},
      rules: {
        email: [
          { required: true, message: '必填', trigger: 'blur' },
          { type: 'email', message: '请输入正确格式', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        encryptType: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      },
      roleChosen: [],
      roleList: [],
      statusMap: {0: '未激活', 1: '可用', 2: '禁用'},
      sourceMap: {0: '后台注册', 1: '运营商'},
      isModify: false,
      dialogAdd: false,
      dialogDetail: false,
      dialogRole: false
    }
  },
  mounted () {
    this.getList()
  },
  computed: {},
  methods: {
    search () {
      this.page.currentPage = 1
      this.getList()
    },
    // 获取列表
    getList () {
      this.listLoading = true
      let params = Object.assign({}, {size: this.page.size, currentPage: this.page.currentPage})
      if (this.username) {
        params.username = this.username
      }
      api.userList(params).then((resp) => {
        if (resp.data.code === 200) {
          this.listLoading = false
          let data = resp.data.data
          if (data) {
            data.list.forEach(item => {
              item.userStatus = item.status === 1
            })
            this.tableData = data.list
            this.page.total = data.count
            this.page.currentPage = data.currentPage
          } else {
            this.tableData = []
            this.page.total = 0
            this.page.currentPage = 1
          }
        }
      })
    },
    // 分页
    pageChange (page) {
      this.page.currentPage = page
      this.getList()
    },
    // 新增弹框
    showAdd () {
      this.dialogAdd = true
      this.isModify = false
    },
    // 新增/编辑 用户提交
    addOk () {
      let flag = 1
      this.$refs['ruleForm'].validate((valid) => {
        if (!valid) {
          flag = 0
        }
      })
      if (!flag) return
      if (this.isModify) {
        api.editUser(this.form).then((resp) => {
          if (resp.data.code === 200) {
            this.$message.success('编辑成功')
            this.dialogAdd = false
            this.getList()
          }
        })
      } else {
        api.addUser(this.form).then((resp) => {
          if (resp.data.code === 200) {
            this.$message.success('新增成功')
            this.dialogAdd = false
            this.getList()
          }
        })
      }
    },
    // 编辑/详情  弹框
    showEdit (row, type) {
      Object.assign(this.form, row)
      if (type) {
        this.dialogDetail = true
      } else {
        this.isModify = true
        this.dialogAdd = true
      }
    },
    // 角色列表
    getRoleList () {
      api.roleList({size: 9999}).then((resp) => {
        if (resp.data.code === 200) {
          let data = resp.data.data.list
          let list = []
          data.forEach(item => {
            list.push({key: item.id, label: item.roleName})
          })
          this.roleList = list
        }
      })
    },
    // 分配角色弹框
    showAssignRole (row) {
      this.userId = row.id
      this.getRoleList()
      // 穿梭框
      this.roleChosen = []
      if (row.roles) {
        row.roles.split(',').forEach(item => {
          this.roleChosen.push(+item)
        })
      }
      this.dialogRole = true
    },
    // 给用户分配角色
    assignRoleOk () {
      api.assignRole({roles: this.roleChosen.join(','), id: this.userId}).then((resp) => {
        if (resp.data.code === 200) {
          this.$message.success('分配成功')
          this.dialogRole = false
          this.getList()
        }
      })
    },
    // 删除
    delUser (row) {
      this.$confirm('确认要删除此用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.delUser({id: row.id}).then((resp) => {
          if (resp.data.code === 200) {
            this.$message.success('删除成功')
            this.getList()
          }
        })
      }).catch(() => {
        // this.$message.info('已取消')
      })
    },
    // 禁用/启动
    runForbidUser (row) {
      // status 禁用 2, 启用 1,掉接口的值刚好相反
      let isRun = 3 - row.status
      api.runForbidUser({id: row.id, isRun}).then((resp) => {
        if (resp.data.code === 200) {
          this.$message.success(row.status === 2 ? '启用成功' : '禁用成功')
        }
      })
    },
    // 重置密码
    resetPwd (row) {
      api.resetPwd({id: row.id}).then((resp) => {
        if (resp.data.code === 200) {
          this.$message.success('重置成功')
        }
      })
    },
    // 新增编辑关闭清空
    clearRoleForm () {
      setTimeout(() => {
        this.form = {
          email: '',
          encryptType: 'MD5',
          source: 0
        }
      }, 500)
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less">
   @import '../assets/style/common.less';
</style>
<style lang="less" scoped>
  .search-box, .table-box{
    padding: 20px;
    text-align: left;
    border: 1px solid #ccc;
  }
  .table-box{
    margin-top: 20px;
  }
  .search-item{
    display: inline-block;
  }
  .btn-add{
    float: right;
  }
</style>
