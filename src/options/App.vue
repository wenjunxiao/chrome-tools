<template>
  <div id="app">
    <div>
      <el-button @click="config">配置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    config () {
      this.$notify({
        title: '配置',
        type: 'success',
        message: '还没有任何配置',
        duration: 5000
      })
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>