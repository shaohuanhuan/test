<!-- 父子组件之间的checkbox选中 -->
<template>
  <div>
    <el-checkbox v-model="checkbox">儿子</el-checkbox>
  </div>
</template>

<script>
export default {
  name: 'cpnts',
  data () {
    return {
      checkbox: this.product.checked
    }
  },
  props: {
    product: {
      checked: {
        type: Boolean,
        default: false
      }
    }
  },
  watch: {
    'product.checked' (newVal) {
       this.checkbox = this.product.checked
    }
  },
  mounted () {

  },
  computed: {},
  component: {}
}
</script>
