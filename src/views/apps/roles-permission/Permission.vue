<template>
  <div class="snail">
    <iframe src="../../../../templates/html-customizer/vertical-menu-template-dark/app-access-permission.html" id="permissionid" scrolling="no" frameBorder="0"
            style="position:absolute;top:64px;left: 0px;right:0px;bottom:100px;"></iframe>
  </div>
</template>

<script>
export default {
  name: 'adminIndex',
  data() {
    return {}
  },
  mounted() {
    /**
     * iframe-宽高自适应显示
     */
    function changepermissionidIframe() {
      const permissionid = document.getElementById('permissionid')
      const deviceWidth = document.body.clientWidth
      const deviceHeight = document.body.clientHeight
      permissionid.style.width = Number(deviceWidth) + 'px' // 数字是页面布局宽度差值
      permissionid.style.height = Number(deviceHeight) + 'px' // 数字是页面布局高度差
    }

    changepermissionidIframe()

    window.onresize = function () {
      changepermissionidIframe()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
