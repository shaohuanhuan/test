<template>
  <div>
    <div class="topMenu">
      <div class="top-title">订单物流</div>
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
  </div>
</template>
<script>
export default {
  data () {
    return {
      selectedSubNav: 0,
      menuList: [
        {
          title: '<i class="icon-menuorder"></i>订单管理',
          url: '/order'
        },
        // {
          // title: '<svg class="icon icon-active" abase.lessria-hidden="true"> <use xlink:href="#icon-wuliu"></use> </svg><svg class="icon icon-unactive" abase.lessria-hidden="true"> <use xlink:href="#icon-wuliu1"></use> </svg>评论管理',
          // url: '/order'
        // },
        {
          title: '<svg class="icon icon-active" abase.lessria-hidden="true"> <use xlink:href="#icon-wuliu"></use> </svg><svg class="icon icon-unactive" abase.lessria-hidden="true"> <use xlink:href="#icon-wuliu1"></use> </svg>物流管理',
          url: '/logisticsManagement'
        },
        {
          title: '<svg class="icon icon-active" abase.lessria-hidden="true"> <use xlink:href="#icon-funds"></use> </svg><svg class="icon icon-unactive" abase.lessria-hidden="true"> <use xlink:href="#icon-funds"></use> </svg>资金管理',
          url: '/fundsManagement'
        }
      ]
    }
  },
  mounted () {
    // 选中一级菜单
    this.$store.dispatch('setNavIndex', 5)
    for (let menuIndex in this.menuList) {
      if (this.$route.path === this.menuList[menuIndex].url) {
        this.selectedSubNav = parseInt(menuIndex)
      }
    }
  },
  components: {},
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
