<template>
  <div id="app">
    <el-row justify="start">
      <el-col span="24">
        <el-button @click="decodeSQL" style="width:100%;">SQL解码</el-button>
      </el-col>
    </el-row>
    <br/>
    <el-row justify="start">
      <el-col span="12">
        <el-button @click="clearCookie" style="width:100%;">清理Cookie</el-button>
      </el-col>
      <el-col span="12">
        <el-input v-model="cookieName" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ACTION_SQL_DECODER } from '../constants'

export default {
  data() {
    return {
      cookieName: 'SESSION'
    }
  },
  methods: {
    decodeSQL () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tab = tabs[0];
        chrome.tabs.sendMessage(tab.id, {
          action: ACTION_SQL_DECODER,
          data: ''
        }, function (response) {
          console.log('contextMenus.response>', tab.id, response);
        });
      });
    },
    clearCookie () {
      const name = this.cookieName || 'SESSION';
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tabUrl = tabs[0].url;
        if (/^(https?):\/\/([^/]+)(.*)$/.test(tabUrl)) {
          var domain = RegExp.$2;
          var path = RegExp.$3;
          var protocols = new Set([RegExp.$1, 'https']);
          var parts = domain.split('.');
          for (let i = 0, m = Math.max(parts.length - 2, 0); i < m; i++) {
            for (let protocol of protocols) {
              let url = protocol + '://' + parts.slice(i).join('.') + path;
              chrome.cookies.remove({
                name,
                url
              }, function (cookie) {
                console.log('remove cookie =>', url, cookie);
              })
            }
          }
        }
      });
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
  margin-top: 10px;
  width: 300px;
}
</style>