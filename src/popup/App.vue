<template>
  <div id="app">
    <div>
      <el-button @click="decodeSQL">SQL解码</el-button>
    </div>
  </div>
</template>

<script>
import { ACTION_SQL_DECODER } from '../constants'

export default {
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
}
</style>