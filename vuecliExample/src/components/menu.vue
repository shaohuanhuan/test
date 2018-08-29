<template>
  <div>
    <router-link to="/user"><el-button >用户管理</el-button></router-link>
    <router-link to="/role"><el-button >角色管理</el-button></router-link>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
  margin: 20px auto;
  width: 1200px;
}
</style>
