<template>
  <section>
    <Cnpt :product="{checked: checkbox2}"></Cnpt>
    <el-checkbox v-model="checkbox2">父亲</el-checkbox>
    <div class="search-box">
      <div class="search-item">
        <label>角色名称：</label>
        <el-input v-model="roleName" @keyup.enter.native="search"></el-input>
      </div>
      <el-button @click="search" >搜索</el-button>
      <el-button type="primary" class="btn-add" @click="showAdd">新增角色</el-button>
    </div>
    <div class="table-box">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="180">
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
          prop="opt"
          label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="showEdit(scope.row, 1)">查看</el-button>
              <el-button type="text" @click="showEdit(scope.row, 0)">编辑</el-button>
              <el-button type="text" @click="delRole(scope.row)">删除</el-button>
              <el-tooltip content="启用/禁用">
                <el-switch
                  v-model="scope.row.roleStatus"
                  @change="runForbidRole(scope.row)"
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
    <!-- 新增/编辑 -->
    <el-dialog :visible.sync="dialogAdd" @close="clearRoleForm(0)">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="角色" prop="roleName">
          <el-input v-model="form.roleName"></el-input>
        </el-form-item>
        <el-form-item label="权限配置" class="form-item-textarea" :class="{'is-error': error}">
          <el-input
          type="textarea"
          v-model="form.roleResources"
          :autosize="{ minRows: 6, maxRows: 20}"></el-input>
          <div v-if="error" class="el-form-item__error">
            无效的json格式
          </div>
        </el-form-item>
        <el-form-item label="权限JSON">
          <tree-view v-if="form.resourceJson" :data="form.resourceJson" :options="{maxDepth: 10}"></tree-view>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogAdd = false">取 消</el-button>
        <el-button type="primary" @click="addOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看详情 -->
    <el-dialog :visible.sync="dialogDetail" @close="clearRoleForm(1)">
      <el-form>
        <el-form-item label="角色">
          {{form.roleName}}
        </el-form-item>
        <el-form-item label="权限配置">
          <div class="form-item-span">{{form.roleResources}}</div>
        </el-form-item>
        <el-form-item label="权限JSON" v-if="form.resourceJson">
          <tree-view :data="form.resourceJson" :options="{maxDepth: 10}"></tree-view>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="dialogDetail = false">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import api from '@/api/role'
import Cnpt from './cnpt'
export default {
  name: 'user',
  data () {
    return {
      tableData: [],
      checkbox2: true,
      form: {
        roleName: '',
        roleResources: '',
        // dataa: {"version":"1","data":[{"domain":"www.baidu.com","statement":[{"reso urce":"/name/setValue","type":["GET"]},{"resource":"/name/getValue","type":["GET"]}]},{"domain":"www.souhu.com","statement":[{"resource":"/kk/setValue","type":["GET"]},{"resource":"/kk/getValue","type":["GET"]}]}]},
        resourceJson: null
      },
      page: {currentPage: 1, size: 10},
      rules: {
        roleName: [
          { required: true, message: '必填', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      },
      roleName: '',
      statusMap: {0: '禁用', 1: '正常', 2: '删除'},
      error: false,
      isModify: false,
      dialogAdd: false,
      dialogDetail: false
    }
  },
  // beforeCreate () {
  //   import('jquery').then((data) => {
  //     const $ = data
  //   })
  // },
  mounted () {
    this.getList()
  },
  computed: {},
  watch: {
    'form.roleResources' (newVal) {
      if (this.isJSON(newVal)) {
        this.error = false
        this.form.resourceJson = JSON.parse(newVal)
      } else if (newVal) {
        this.error = true
      }
    }
  },
  components: {Cnpt},
  methods: {
    search () {
      this.getList()
    },
    // 获取列表
    getList () {
      let params = Object.assign({}, {size: this.page.size, currentPage: this.page.currentPage})
      if (this.roleName) {
        params.roleName = this.roleName
      }
      api.roleList(params).then((resp) => {
        if (resp.data.code === 200) {
          let data = resp.data.data
          if (data) {
            data.list.forEach(item => {
              item.roleStatus = Boolean(item.status)
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
    // 新增角色提交
    addOk () {
      let flag = 1
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          flag = 1
        } else {
          flag = 0
        }
      })
      if (!flag) return
      if (this.isModify) {
        api.editRole(this.form).then((resp) => {
          if (resp.data.code === 200) {
            this.$message.success('编辑成功')
            this.dialogAdd = false
            this.getList()
          }
        })
      } else {
        api.addRole(this.form).then((resp) => {
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
      if (this.isJSON(row.roleResources)) {
        this.form.resourceJson = JSON.parse(row.roleResources)
      }
      if (type === 0) {
        this.isModify = true
        this.dialogAdd = true
      } else {
        // $('#json-renderer').jsonViewer(this.form.roleResources)
        this.dialogDetail = true
      }
    },
    // 禁用/启动
    runForbidRole (row) {
      // status 禁用 0, 启用 1,掉接口的值刚好相反
      let isRun = 1 - row.status
      api.runForbidRole({id: row.id, isRun}).then((resp) => {
        if (resp.data.code === 200) {
          this.$message.success(row.status === 0 ? '启用成功' : '禁用成功')
          row.status = 1 - row.status
        }
      })
    },
    // 删除
    delRole (row) {
      this.$confirm('确认要删除此角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.delRole({id: row.id}).then((resp) => {
          if (resp.data.code === 200) {
            this.$message.success('删除成功')
            this.getList()
          }
        })
      }).catch(() => {
        this.$message.info('已取消')
      })
    },
    clearRoleForm (flag) {
      this.form = {roleName: '', roleResources: ''}
    },
    isJSON (str) {
      if (typeof str === 'string') {
        try {
          var obj = JSON.parse(str)
          if (typeof obj === 'object' && obj) {
            return true
          } else {
            return false
          }
        } catch (e) {
          // console.log('error：' + str + '!!!' + e)
          return false
        }
      }
      console.log('It is not a string!')
    }
  }
}
</script>
<style lang="less">
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
