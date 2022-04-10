console.log('inject loading =>');
document.currentScript.addEventListener('injected', handleEvent);

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'


function handleEvent(event) {
  console.log('injected =>', event.detail)
  Vue.use(ElementUI)
  new Vue({
    el: event.detail.el,
    render: h => h(App)
  });
  // .$mount(event.detail.el);
}


