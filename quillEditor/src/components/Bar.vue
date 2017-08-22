<template>
  <div>
    <div class="bar">
      <div class="logo">
        <img src="../assets/img/logo.svg" width="99">
      </div>
      <ul>
        <li v-for="(bar,barIndex) in navbarList" @click="changeBar(barIndex)" :class="{selected:firstNav?firstNav===barIndex:showNav===barIndex}">
          <router-link :to="bar.url" :class="title==bar.title? 'active': ''" v-html="bar.title"></router-link>
        </li>

      </ul>
      <div class="bar-right">
          <div class="head-img">
            <img v-if="src" :src="src" alt="">
            <img v-else src="/static/img/default_avatar.jpg" alt="">
          </div>
          <!--<i class="el-icon-caret-bottom"></i>-->
          <el-dropdown @command="handleCommand">
           <span class="el-dropdown-link">
            <i class="el-icon-caret-bottom el-icon--right" style="font-size:5px;"></i>
           </span>
            <el-dropdown-menu slot="dropdown">
              <router-link :to="{path: '/setAccount'}"><el-dropdown-item command="">设置</el-dropdown-item></router-link>
              <el-dropdown-item command="exit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
    </div>
  </div>
</template>
<script>
import LoginAPI from '@/api/loginAPI'
import { mapGetters } from 'vuex'
export default {
  name: 'bar',
  data () {
    return {
      title: '工作台',
      showNav: 0,
      serverLevel: '1',
      src: '',
      navbarList: [
        {
          title: '工作台',
          url: '/index'
        },
        {
          title: '我的官网',
          url: '/pageManagement'
        },
        {
          title: '客户开发',
          url: '/develop'
        },
        {
          title: '全网监控',
          url: '/socialMonitor'
        },
        {
          title: '联系人管理',
          url: '/contact'
        },
        {
          title: '订单物流',
          url: '/order'
        }
      ]
    }
  },
  mounted: function () {
    /**
     * 权限模块
     * 普通 0
     * 引航版/普及版2
     * 超级盈店1
     * 如果 是普通用户 ，点击客户开发直接跳转到的是 社交推广tab,(客户开发tab被隐藏)
     * @type {[type]}
     */
    this.serverLevel = window.localStorage.serverLevel
    if (this.serverLevel === '0') {
      this.navbarList[2].url = '/extension'
      this.navbarList[3].url = '/inquiryMonitor'
    }

    LoginAPI.accountInfo().then(res => {
      if (res.data.code === 0) {
        this.src = res.data.data.avatar
        console.log(this.src)
      }
    })
  },
  watch: {
  },
  computed: {
    ...mapGetters(['firstNav'])
  },
  methods: {
    changeBar: function (bindex) {
      this.firstNav = bindex
      this.showNav = bindex
    },
    handleCommand (command) {
      if (command === 'exit') {     // 退出
        let param = {}
        LoginAPI.logOut(param).then((res) => {
          let code = res.data.code
          if (code === 0) {
            this.$router.push({path: '/login'})
          } else {
            this.$message.error(res.data.message)
          }
        })
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .bar{
    width: 100%;
    height: 50px;
    background: #FFFFFF;
    border-bottom: #DFE3EB 1px solid;
    overflow: hidden;
    .logo{
      display: inline-block;
      vertical-align: top;
      line-height: 50px;
      margin:0 30px 0 30px;
      img{
        vertical-align: middle;
      }
    }
    .bar-right {
        float: right;
        position: relative;
        margin-right:50px;
        .head-img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          margin-top: 10px;
          margin-right: 30px;
          display: inline-block;
          overflow: hidden;
          img{
            width:32px;
            height: 32px;
          }
        }
        .el-icon--right{
          position: absolute;
          top:-20px;
          right: 0;
        }
      }
    ul{
      display: inline-block;
      li.selected{
        a {
          color: #33475B;
          font-weight: bolder;
        }
      }
      li{
        height: 50px;
        display: inline-block;
        margin-right: 30px;
        vertical-align: top;
        a{
          font-family: PingFang-SC-Medium;
          font-size: 13px;
          letter-spacing: 0;
          line-height: 50px;
          color: #4F6D95;
        }
        a:active{
          border-bottom: 4px solid #5488F9;
          padding-bottom: 20px;
        }
        a:hover{
          border-bottom: 4px solid #5488F9;
          padding-bottom: 23px;
        }
      }

    }
  }
  .el-dropdown-menu{
    background: #FFFFFF;
    border: 1px solid #CBD6E2;
    box-shadow: 0 2px 4px 0 rgba(51,71,91,0.20);
    border-radius: 8px;
  }
  .el-dropdown-menu__item{
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #33475B;
    letter-spacing: 0;
  }
  .el-dropdown-menu__item:not(.is-disabled):hover{
    background: #F4F6F8;
  }

</style>
