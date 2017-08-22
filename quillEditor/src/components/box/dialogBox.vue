<template>
  <el-dialog class="my-dialog"
             top="40%"
             v-bind:show-close=false
             v-model="config.visible"
             :class="config.theme">
    <div class="confirm-main">
      <i class="icon-font">&#xe629;</i>
      <span v-if="config.notice != '' ">{{config.notice}}</span>
    </div>
    <div v-if="config.message" class="message">
      <el-popover trigger="hover" placement="top">
        <p>{{config.message}}</p>
        <div slot="reference" class="name-wrapper">
          {{config.message}}
        </div>
      </el-popover>
    </div>
    <div class="confirm-btn" v-if="!config.isLoading">
      <el-button class="confirm" @click="sure">{{config.sureText}}</el-button>
      <el-button class="close" @click="close">{{config.cancelText}}</el-button>
    </div>
    <div class="confirm-btn loading loading-circle" v-else></div>
  </el-dialog>
</template>
<script>
  export default {
    props: {
      config: {
        theme: '', // 主题class 如red：红色弹框
        visible: false,
        notice: '',
        sureText: '确定',
        cancelText: '取消',
        callback: null,
        isLoading: false
      }
    },
    watch: {
      'config.isLoading' () {
        if (!this.config.isLoading) {
          this.close()
        }
      }
    },
    methods: {
      sure () {
        this.$emit('sure')
        if (this.config.callback) {
          this.config.callback()
        }
        if (!this.config.isLoading) {
          this.close()
        }
      },
      close () {
        this.$emit('close')
        this.config.visible = false
      }
    }
  }

</script>

<style lang="less" rel="stylesheet/less">
  @import "../../assets/style/variable";
  .my-dialog {
    .el-dialog__header{
      border:none;
    }
    .el-dialog {
      width: 360px;
      min-height: 178px;
      margin: 0;
      border-radius: 4px;
      box-shadow: 0 2px 6px rgba(51,71,91,.6);
      .el-dialog__body {
        padding: 0;
        .confirm-main {
          height: 24px;
          margin-top: 20px;
          margin-left: 40px;
          i {
            margin-right: 10px;
            font-size: 24px;
            color: #FEA000;
          }
          span {
            font-size: 16px;
            color: @textColor;
          }
        }
        .confirm-btn {
          margin-top: 35px;
          margin-left: 80px;
          .el-button {
            width: 80px;
            height: 32px;
            font-size: 13px;
            border-radius: 4px;
            padding: 0;
          }
          .el-button + .el-button {
            margin-left: 5px;
          }
          .close {
            color: @cancel;
            border: none;
            cursor: pointer;
          }
          .confirm {
            color: @white;
            font-weight: 300;
            background: @activeBlue;
            border: none;
          }
        }
      }
      .message{
        margin: 15px 0 -10px 80px;
        font-size: 14px;
      }
      .name-wrapper{
        width: 200px;
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .red{ // 红色确认框
    .el-dialog {
      .el-dialog__body{
        .confirm-main{
          .icon-font{
            color: #FF3B6E;
          }
          span{
            font-size: 14px;
            font-weight: bold;
          }
        }
        .confirm-btn {
          .confirm{
            background-color: #FF3B6E;
          }
        }
      }
    }
  }

</style>
