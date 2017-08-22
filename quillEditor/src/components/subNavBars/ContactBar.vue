<template>
  <div>
     <div class="topMenu">
      <div class="top-title">联系人管理</div>
      <ul class="menu">
        <router-link  v-for="(mItem,mindex) in menuList" :to="{ path: mItem.url, query: { type: mItem.type}}" :key="mindex">
            <li :class="{curr:mindex===selectedSubNav}" @click="changeMenu(mindex, mItem.type)" v-html="mItem.title">
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
          title: '<i class="icon-contact-person"></i>联系人',
          url: '/contact',
          type: 0
        },
        {
          title: '<i class="icon-gongsi1"></i>公司',
          url: '/contact',
          type: 1
        }
      ]
    }
  },
  mounted () {
    this.$store.dispatch('setNavIndex', 4)
    if (parseInt(this.$route.query.type) === 1) {
      this.selectedSubNav = 1
    } else {
      this.selectedSubNav = 0
    }
  },
  watch: {
    $route () {
      if (parseInt(this.$route.query.type) === 1) {
        this.selectedSubNav = 1
      } else {
        this.selectedSubNav = 0
      }
    }
  },
  methods: {
    changeMenu (mindex, type) {
      this.selectedSubNav = mindex
      this.$store.commit('CONTACT_TYPE', {contactType: type})
    }
  }
}
</script>
<style lang='less'>
@import '../../assets/style/nav/subNav.less';
</style>
