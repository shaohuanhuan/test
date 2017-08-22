<template>
  <div>
    <div class="topMenu">
      <div class="top-title">客户开发</div>
      <ul class="menu">
        <router-link  v-for="(mItem,mindex) in menuList" :to="{ path: mItem.url}" :key="mindex" v-if="mItem.url !== '/develop' || serverLevel!=='0'">
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
      menuList: [
        {
          title: '<i class="icon-find-client"></i>发现客户',
          url: '/develop'
        },
        {
          title: '<i class="icon-social-promotion"></i>社交推广',
          url: '/extension'
        }
      ]
    }
  },
  components: {},
  mounted () {
    this.serverLevel = window.localStorage.serverLevel
    this.$store.dispatch('setNavIndex', 2)
    for (let menuIndex in this.menuList) {
      if (this.$route.path === this.menuList[menuIndex].url) {
        this.selectedSubNav = parseInt(menuIndex)
      }
    }
  },
  methods: {
    changeMenu (mindex) {
      this.selectedSubNav = mindex
    }
  }
}
</script>
<style lang='less'>
@import '../../assets/style/nav/subNav.less';
</style>
