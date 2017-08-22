<template>
  <div>
    <div class="topMenu">
      <div class="top-title">全网监控</div>
      <ul class="menu">
        <!-- serverLevel 是1 和2的时候，不显示 邮件监控 -->
        <router-link  v-for="(mItem,mindex) in menuList" :to="{ path: mItem.url}" :key="mindex" v-if="(mItem.url!=='/mailMonitor' || serverLevel !== '0') && (mItem.url!=='/mailMonitor' || serverLevel !== '2') && (mItem.url!=='/socialMonitor' || serverLevel !== '0')">
            <li :class="{curr:mindex===selectedSubNav}" @click="changeMenu(mindex)" v-html="mItem.title">

            </li>
        </router-link>
      </ul>
    </div>
     <div class="router-view">
        <router-view></router-view>
      </div>
  </div>

</template>
<script>
export default {
  data () {
    return {
      selectedSubNav: 0,
      serverLevel: '1',
      timerMonitor: 0,
      menuList: [
        {
          title: '<i class="icon-social"></i>社交监控',
          url: '/socialMonitor'
        },
        {
          title: '<i class="icon-email"></i>邮件监控',
          url: '/mailMonitor'
        },
        {
          title: '<i class="icon-inquiry"></i>询盘监控',
          url: '/inquiryMonitor'
        }
      ]
    }
  },
  components: {},
  mounted () {
     /**
     * 权限模块
     * 普通 0
     * 引航版/普及版2
     * 超级盈店1
     * 如果 是普通用户 ，点击客户开发直接跳转到的是 社交推广tab,(客户开发tab被隐藏)
     * @type {[type]}
     */
    this.serverLevel = window.localStorage.serverLevel
    this.$store.dispatch('setNavIndex', 3)
    for (let menuIndex in this.menuList) {
      if (this.$route.path === this.menuList[menuIndex].url) {
        this.selectedSubNav = parseInt(menuIndex)
      }
    }
  },
  methods: {
    changeMenu (mindex) {
      this.selectedSubNav = mindex
      this.timerMonitor++
      this.$store.commit('MONITOR_TIMERMONITOR', { timerMonitor: this.timerMonitor, mindex: mindex })
    }
  }
}
</script>
<style lang='less'>
@import '../../assets/style/nav/subNav.less';
</style>
