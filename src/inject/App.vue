<template>
  <div class="inject">
    <div>
      <el-button @click="decodeSQL">SQL解码111</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    decodeSQL () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        duration: 5000
      })
    }
  }
}
</script>

<style scoped>
.inject {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
  z-index: 999;
}
</style>