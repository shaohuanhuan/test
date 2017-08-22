<template>
  <div class="ui-website">
    <div class="topMenu">
      <div class="top-title">
        我的官网
        <span class="down-line"></span>
        <el-select v-model="value" placeholder="请选择" @change="changeDomain" style="vertical-align: bottom;">
          <!--<el-option
            v-for="item in companyDomain"
            key="domain"
            :label="item.label"
            :value="item.value">
          </el-option>-->
          <el-option
            key="domain"
            :label="domainInfo.subdomain+apiHost"
            :value="domainInfo.subdomain" v-if="domainInfo.subdomain != '' && domainInfo.subdomain != 'null' && domainInfo.subdomain != null">
          </el-option>
          <el-option
            key="domain"
            :label="domainInfo.topdomain"
            :value="domainInfo.topdomain" v-if="domainInfo.topdomain != '' && domainInfo.topdomain != 'null' && domainInfo.topdomain != null">
          </el-option>
        </el-select>
        <el-popover
          ref="popover5"
          placement="bottom"
          trigger="hover">
          <div class="qrcode-display">
            <p class="title">手机扫描访问</p>
            <p><img :src="qrcodeImg" alt="" /></p>
            <p class="opaction"><span class="opaction-one" @click="copyLink">复制页面链接</span><textarea id="copyLinkUrl" style="opacity: 0;position: absolute;top:0">{{ linkDomainUrl }}</textarea><a :href="linkDomainUrl" target="_blank"><span class="opaction-two">电脑上查看</span></a></p>
          </div>
        </el-popover>
        <el-button type="primary" v-popover:popover5>访问官网</el-button>
        <el-button type="primary" @click="editDomainPop()">域名设置</el-button>
      </div>
      <ul class="menu">
        <router-link  v-for="(mItem,mindex) in menuList" :to="{ path: mItem.url}" :key="mindex">
            <li :class="{curr:mindex===selectedSubNav}" @click="changeMenu(mindex)" v-html="mItem.title">
            </li>
        </router-link>
      </ul>
    </div>
    <div class="router-view">
      <router-view></router-view>
    </div>
    <!--域名设置弹框start-->
    <el-dialog title="域名设置" v-model="editDomain" custom-class="edit-domain">
      <div class="desc lf-padding20">
        您可以直接使用盈店通给您免费提供的站点域名作为您的官网地址，或者绑定已有的一级域名作为官网地址，二者选其一即可，也可以同时使用
      </div>
      <div class="domainEdit">
        <div class="edit">
          <p v-if="!updateDomain && domainInfo.subdomain != ''"><span class="domain-display">盈店通站点域名：{{ domainInfo.subdomain }}.onloon.cc</span><span class="btn" @click="updateDomain = true">更改前缀</span></p>
          <p v-else><span class="domain-display">盈店通站点域名：</span><input type="text" class="domain-input" v-model="secondDomain" placeholder="6-15位英文或数字" />.onloon.cc<span class="btn can-submit" @click="updateDomainFunc('2')">确定</span><span class="btn" @click="cancelFunc()" v-if="domainInfo.subdomain != ''">取消</span></p>
          <p v-if="secondeError != ''" class="error-prompt"><i class="icon-prompt"></i>{{ secondeError }}</p>
        </div>
        <div class="binddomain">
          <p class="title">绑定一级域名（请先CNAME解析至cname.onloon.cn）</p>
          <p class="prompt">提示：请填写www后的内容，比如域名为www.test.com，在此处仅需填写test.com</p>
          <p class="bind"><span class="bold-desc">www.</span><input type="text" class="domain-input" v-model="indepDomain" /><span class="sure-btn" @click="updateDomainFunc('1')">确定</span></p>
          <p v-if="indepError != ''" class="error-prompt"><i class="icon-prompt"></i>{{ indepError }}</p>
        </div>
      </div>
      <div class="help">
        <i class="icon-quest operating-help"></i>
        <p class="title">如何在您的域名提供商处添加域名解析</p>
        <ul class="operating-step">
          <li>1、根据域名服务商提供的账号及密码登录到域名服务商提供的管理后台；</li>
          <li>2、点击“域名管理”；</li>
          <li>3、找到需要设置的域名；</li>
          <li>4、点击“域名解析”；</li>
          <li>
            5、添加一条域名解析记录，主机名（host）为www，解析类型选择CNAME（别名），记录值填写cname.onloon.cc；
            <div class="note">
              注：若您的域名解析配置中已经存在主机名为www的解析记录，须先将其删除再行步骤5；若您任然需要使用之前的www解析记录解析到您已有的网站而不能删除，建议您注册新的域名来绑定盈店通，或者也可以将您不带www的域名解析到您原来的网站而将带www的域名解析到盈店通
            </div>
          </li>
          <li>
            6、保存后等待解析生效即可，最长解析时间不超过72小时
            <div class="note">
              以上参考仅为参考，具体操作以注册商提供的方式为准
            </div>
          </li>
        </ul>
      </div>
    </el-dialog>
    <!--域名设置弹框end-->
  </div>
</template>
<script>
import myWebSiteApi from '../../../src/api/myWebSiteApi'
export default {
  data () {
    return {
      value: '',
      selectedSubNav: 0,
      qrcodeImg: '',
      linkDomainUrl: '',
      editDomain: false,
      updateDomain: false,
      domainInfo: {
        topdomain: '',
        subdomain: ''
      },  // 域名信息
      secondDomain: '', // 二级域名
      apiHost: process.env.API_HOST,
      secondeError: '', // 修改二级域名错误提示
      indepDomain: '', // 独立域名
      indepError: '', // 修改独立域名错误提示
      menuList: [
        {
          title: '<i class="icon-menupage"></i>页面管理',
          url: '/pageManagement'
        },
        {
          title: '<i class="icon-menugroup"></i>分组管理',
          url: '/Group'
        },
        {
          title: '<i class="icon-menuprod"></i>产品列表',
          url: '/product'
        }
      ]
    }
  },
  mounted () {
    // 选中一级菜单
    this.$store.dispatch('setNavIndex', 1)
    let path = this.$route.path
    for (let menuIndex in this.menuList) {
      if (path === this.menuList[menuIndex].url) {
        this.selectedSubNav = parseInt(menuIndex)
      }
    }
    // 分类，编辑产品页面的二级菜单
    if (path.includes('/category') || path.includes('/ProductModify')) {
      this.selectedSubNav = 2
    }
    /**
     * 获取域名
     */
    myWebSiteApi.getCompanyDomain().then(res => {
      if (!res.data.code) {
        if (res.data.data !== '' && res.data.data !== null && res.data.data !== undefined) {
          this.domainInfo = res.data.data
          this.domainInfo.subdomain = res.data.data.subdomain
          this.secondDomain = res.data.data.subdomain
          this.indepDomain = res.data.data.topdomain
        } else {
          this.domainInfo.topdomain = ''
          this.domainInfo.subdomain = ''
          this.secondDomain = ''
          this.indepDomain = ''
        }
        this.setDefaultDomain(this.domainInfo)
        this.$store.commit('DOMAIN_COMPANY', res.data.data)
      }
    })
  },
  components: {},
  methods: {
    // 设置默认选中域名
    setDefaultDomain (domain) {
      let contentdomain = process.env.HOMEPAGE
      let url = `${contentdomain}${this.$store.getters.editorMenu}?shopId=${window.localStorage.shopId}`
      if (domain.topdomain !== '' && domain.topdomain !== null && domain.topdomain !== 'null') { // 判断独立域名
        let topmain = domain.topdomain
        url = 'http://' + topmain
        this.value = topmain
      } else {
        url = 'http://' + domain.subdomain + process.env.API_HOST
        this.value = domain.subdomain + process.env.API_HOST
      }
      this.getQrcodeFunc(url)
    },
    // 变更域名
    changeDomain () {
      // let contentdomain = process.env.HOMEPAGE
      // let url = `${contentdomain}${this.$store.getters.editorMenu}?shopId=${window.localStorage.shopId}`
      let url = ''
      if (this.value === this.secondDomain) {  // 二级域名
        url = 'http://' + this.domainInfo.subdomain + process.env.API_HOST
      } else if (this.value === this.indepDomain) {  // 一级域名
        url = 'http://' + this.domainInfo.topdomain
      } else {
        // url = `${contentdomain}?shopId=${window.localStorage.shopId}`
        url = 'http://' + this.domainInfo.subdomain + process.env.API_HOST
      }
      this.getQrcodeFunc(url)
    },
    // 获取二维码方法
    getQrcodeFunc (contentdomain) {
      this.linkDomainUrl = contentdomain
      this.qrcodeImg = process.env.DOMAIN + '/bshop/index/getqrcode?content=' + contentdomain
    },
    changeMenu (mindex) {
      this.selectedSubNav = mindex
    },
    // 域名设置弹框
    editDomainPop () {
      this.editDomain = true
      if (this.domainInfo !== '' && this.domainInfo !== null && this.domainInfo !== undefined) {
        this.secondDomain = this.domainInfo.subdomain
        this.indepDomain = this.domainInfo.topdomain
      } else {
        this.secondDomain = ''
        this.indepDomain = ''
      }
      this.secondeError = ''
      this.indepError = ''
    },
    // 设置二级域名取消
    cancelFunc () {
      this.updateDomain = false
      if (this.domainInfo !== '' && this.domainInfo !== null && this.domainInfo !== undefined) {
        this.secondDomain = this.domainInfo.subdomain
      }
    },
    // 修改二级域名
    updateDomainFunc (type) {
      this.secondeError = ''
      this.indepError = ''
      let senddata
      let reg = /^[0-9A-Za-z]{6,15}$/
      let regdomain = /(([A-Za-z0-9-~]+)\.com)+$/
      if (type === '2') {   // 二级域名设置
        if (this.secondDomain === '' || this.secondDomain === null || this.secondDomain === undefined) {
          this.secondeError = '绑定失败，二级域名不能为空'
          return false
        } else {
          if (this.secondDomain.match(reg) === null) {
            this.secondeError = '绑定失败，二级域名请输入正常格式，6-15位的英文或数字'
            return false
          } else {
            senddata = {
              subdomain: this.secondDomain
            }
          }
        }
      } else {  // 独立域名设置
        if (this.indepDomain === '' || this.indepDomain === null || this.indepDomain === undefined) {
          this.indepError = '绑定失败，独立域名不能为空'
          return false
        } else {
          if (this.indepDomain.match(regdomain) === null) {
            this.indepError = '绑定失败，请输入正确的域名格式'
            return false
          } else {
            let index = this.indepDomain.indexOf('.com')
            if (index === this.indepDomain.length - 4) {
              senddata = {
                topdomain: this.indepDomain
              }
            } else {
              this.indepError = '绑定失败，请输入正确的域名格式'
              return false
            }
          }
        }
      }
      myWebSiteApi.updateDomain(senddata).then(res => {
        if (res.data.code === 0) {
          if (type === '2') {
            this.updateDomain = false
            this.domainInfo.subdomain = this.secondDomain
            this.setDefaultDomain(this.domainInfo)
            this.$message({
              message: '修改二级域名成功',
              type: 'success'
            })
          } else {
            this.domainInfo.topdomain = this.indepDomain
            this.setDefaultDomain(this.domainInfo)
            this.$message({
              message: '修改独立域名成功',
              type: 'success'
            })
          }
        } else {
          if (res.data.data === '') {
            if (type === '2') {
              this.secondeError = '修改二级域名失败'
            } else {
              this.indepError = '修改独立域名失败'
            }
          } else {
            if (type === '2') {
              this.secondeError = res.data.message
            } else {
              this.indepError = res.data.message
            }
          }
        }
      })
    },
    // 复制链接
    copyLink () {
      let Url2 = document.getElementById('copyLinkUrl')
      Url2.select()    // 选择对象
      document.execCommand('Copy', false, null)     // 执行浏览器复制命令
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    }
  },
  watch: {
    '$route' (to, from) {
      // 分类，编辑产品页面的二级菜单
      if (to.path.includes('/category') || to.path.includes('/ProductModify')) {
        this.selectedSubNav = 2
      }
    }
  }
}
</script>
<style lang='less' rel="stylesheet/less">
  @import "../../assets/style/variable.less";
  @import '../../assets/style/nav/subNav.less';
  .qrcode-display{
    .title{
      text-align: center;
      margin-top:10px
    }
    img{
      width:180px;
    }
    .opaction{
      overflow: hidden;
      span{
        cursor: pointer;
        text-decoration:underline;
        color: #33475B;
      }
      span:hover{
        color: #5488F9;
      }
      .opaction-one{
        float:left;
        margin-left:15px;
      }
      .opaction-two{
        float:right;
        margin-right:15px;
      }
    }
  }
  .ui-website{
    .router-view{
      /*width: calc(~'100% - 200px');*/
    }
    .topMenu{
      /*width: calc(~'100% - 200px');*/
      .menu{
        border-bottom: #DFE3EB;
      }
      .down-line{
        display: inline-block;
        height: 30px;
        background: #CAD6E2;
        width: 1px;
        vertical-align: middle;
        margin: 0 10px;
      }
      .el-button{
        padding: 7px 15px;
        margin-left: 10px;
      }
      .el-select{
        .el-input{
          input{
            height: 30px;
          }
        }
      }
    }
  }
.lf-padding20{
  padding:0 20px;
}
.edit-domain{
  .desc{
    font-size: 13px;
    color: #33475B;
    line-height: 21px;
  }
  .domainEdit{
    background: #F5F8FA;
    margin:16px 20px;
    padding:0 16px;
    .error-prompt{
      font-size: 13px;
      color: #F86563;
      line-height: 22px;
      margin-top: 18px;
      i{
        font-size: 20px;
        margin-right:16px;
      }
    }
    .edit{
      padding:11px 0 18px 0;
      border-bottom:1px solid #DFE3EB;
      .domain-display{
        font-size: 14px;
        color: #33475B;
        line-height: 33px;
        font-weight: 600;
      }
      .domain-input{
        border: 1px solid #CBD6E3;
        border-radius: 4px;
        font-size:13px;
        padding:4px 0;
        text-indent: 19px;
        line-height: 21px;
      }
      .btn{
        border-radius: 4px;
        font-size: 13px;
        line-height: 21px;
        padding:7px 14px;
        margin-left:16px;
        cursor: pointer;
        background: #FFFFFF;
        border: 1px solid #CBD6E3;
        color: #4F6D95;
      }
      .can-submit{
        background: #5488F9;
        color: #fff;
        border:#5488F9;
      }
    }
    .binddomain{
      padding:16px 0;
      .title{
        font-size: 14px;
        color: #33475B;
        line-height: 22px;
        font-weight: 600;
      }
      .prompt{
        margin-top:5px;
        font-size: 13px;
        color: #7D98B6;
        line-height: 22px;
      }
      .bind{
        margin-top:16px;
        .bold-desc{
          font-size: 14px;
          color: #33475B;
          line-height: 22px;
          margin-right:13px;
          font-weight: 600;
        }
        .sure-btn{
          background: #5488F9;
          border-radius: 4px;
          color: #FFFFFF;
          padding:8px 27px;
          margin-left:16px;
          cursor: pointer;
        }
        .domain-input{
          padding:6px 0;
          font-size: 13px;
          line-height: 18px;
          text-indent: 16px;
          border-radius: 4px;
          border: 1px solid #CBD6E3;
        }
      }
    }
  }
  .help{
    background: #ffeee6;
    border: 1px solid #feddcc;
    border-radius: 4px;
    padding:16px 18px 16px 52px;
    margin:0 20px;
    position:relative;
    .operating-help{
      position: absolute;
      top:18px;
      left:16px;
      font-size: 20px;
      color: #F86563;
    }
    .title{
      font-size: 14px;
      color: #404040;
      letter-spacing: 0;
      line-height: 21px;
    }
    .operating-step{
      margin-top:2px;
      font-size: 13px;
      color: #666666;
      letter-spacing: 0;
      line-height: 21px;
      .note{
        font-size: 12px;
        color: #979797;
        letter-spacing: 0;
        line-height: 21px;
        margin-top:2px;
      }
    }
  }
}
</style>
