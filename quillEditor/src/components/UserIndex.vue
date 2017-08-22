<template>
  <div class="userIndex">
   <bar></bar>
   <router-view></router-view>
  </div>
</template>
<script>
import Bar from '@/components/Bar'

export default {
  name: 'userIndex',
  components: {
    Bar
  }
}
</script>
<style lang="less">
</style>
