<!-- 页面截图 -->
<template>
  <div>
    <el-button @click="doChange" type="primary">把该页面转成canvas</el-button>
    <img id="growImg" ref="growImg" style="width: 500px;height: 500px;"/>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
export default {
  name: 'html2canvas',
  data () {
    return {
    }
  },
  props: {
  },
  watch: {
  },
  mounted () {

  },
  methods: {
    doChange () {
      let _this = this
      /* eslint-disable */
      html2canvas(document.body).then(function(canvas) {
        console.log(_this)
        canvas.style.width = "100px";
        canvas.style.height = "100px";
        var image = new Image();
        console.log(_this.$refs.growImg)
        _this.$refs.growImg.setAttribute('src', canvas.toDataURL());
        document.body.appendChild(canvas)
      })
    }
  },
  computed: {},
  components: {}
}
</script>
