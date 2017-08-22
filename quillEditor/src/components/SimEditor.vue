<template>
  <div class="multiEditor">
    <textarea ref="editor" v-model="content" :placeholder="placeholder" autofocus @click="removetext"></textarea>
  </div>
</template>
<script>
  import Simditor from '../../node_modules/monkeywang-simditor/lib/simditor'
  import '../../node_modules/monkeywang-simditor/styles/simditor.css'
  export default{
    data () {
      return {
        msg: 'hello vue',
        content: '',
        timer: null,
        id: 1,
        editor: ''
      }
    },
    props: {
      defaultContent: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: '请输入内容'
      }
    },
    mounted () {
      // 初始化富文本编辑器
      this.editor = new Simditor({
        textarea: this.$refs.editor,
        upload: {
          url: `${process.env.DOMAIN}/bshop/config/pic/upload`,
          // params: {filename: 123},
          fileKey: 'picture',
          connectionCount: 3
        },
        success: function (res) {
          console.log(res)
        }
      })
      this.editor.setValue(this.defaultContent)
      this.editor.on('valuechanged', (e, src) => {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.$emit('getValue', this.editor.getValue())
        }, 500)
      })
    },
    watch: {
      defaultContent () {
        this.editor.setValue(this.defaultContent)
      }
    },
    methods: {
      removetext () {
        this.editor.setValue(this.defaultContent)
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .multiEditor {
    .simditor {
      margin-bottom: 20px;
      border: none;
      .simditor-body {
        overflow: auto;
        min-height: 220px;
        height: 70px;
      }
      .simditor-wrapper .simditor-placeholder{
        .simditor-toolbar > ul > li {
          position: relative;
          display: inline-block;
          font-size: 0;
        }
        color: #cbd6e2;
        font-size: 13px;
      }
    }
  }
</style>
