<template>
  <div class="ip-wraper">
    <div class="mask-kk" v-if="imgPreview.show" @click="imgPreview.show = false"></div>
    <div class="imgPreview-kk" v-if="imgPreview.show">
      <i class="icon-font go go-left" @click="go(-1)">&#xe60a;</i>
      <img class="preview-src" :src="src">
      <i class="icon-font go go-right" @click="go(1)">&#xe613;</i>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      imgPreview: {
        show: false,
        imgs: [{}]
      }
    },
    data () {
      return {
      }
    },
    mounted () {
      console.log(this.imgPreview)
    },
    computed: {
      src () {
        let index = this.$store.state.monitor.index
        if (this.imgPreview.imgs[index] === undefined) {
          return ''
        }
        return this.imgPreview.imgs[index].imgUrl || this.imgPreview.imgs[index].address
      }
    },
    methods: {
      go (step) {
        let index = this.$store.state.monitor.index
        if (index + step < 0) index = this.imgPreview.imgs.length
        index = (index + step) % this.imgPreview.imgs.length
        this.$store.commit('MONITOR_IMGINDEX', {index})
        console.log(index)
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import '../assets/style/variable';
  .ip-wraper{
    z-index: 100;
  }
  .mask-kk{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000;
  }
  .imgPreview-kk{
    position: fixed;
    top:200px;
    .preview-src{
        max-width: 1200px;
        max-height: 450px;
      }
      .go{
        cursor: pointer;
        position: absolute;
        top: 220px;
        font-size: 80px;
        color: rgb(191, 196, 217);
      }
      .go-left{
        left: -180px;
      }
      .go-right{
        right: -180px;
      }
    .el-dialog{
      width: auto;
      background: rgba(255,255,255,0);
      box-shadow: 0 1px 3px rgba(0,0,0,0);
      border: none;
      
      .el-dialog__header{
        .el-dialog__headerbtn{
          position: absolute;
          color: @textColor;
          font-size: 30px;
          top:-40px;
          right: -220px;
        }
        .el-dialog__close{
          font-size: 30px;
        }
      }
    }
  }
</style>
