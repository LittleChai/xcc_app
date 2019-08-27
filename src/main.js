import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import axios from './http.js'
import md5 from 'js-md5'
import echarts from 'echarts'
import vuescroll from 'vuescroll';
import iview from 'iview'
import 'iview/dist/styles/iview.css'

import "../static/styles/reset.css";
import "../static/styles/app.css";


Vue.config.productionTip = false

Vue.use(iview);

Vue.use(vuescroll, {
  ops: {
    vuescroll: {
      mode: 'native',
      sizeStrategy: 'percent',
      detectResize: true
    },
    scrollPanel: {
      scrollingX: false,
      scrollingY: true,
      speed: 300,
      easing: 'easeInQuint'
    },
    rail: {
      background: 'rgba(255,255,255,0)',
      opacity: 0,
      size: '6px',
      specifyBorderRadius: false,
      gutterOfEnds: null,
      gutterOfSide: '2px',
      keepShow: false
    },
    bar: {
      showDelay: 1000,
      onlyShowBarOnScroll: false,
      keepShow: true,
      background: 'rgb(255,255,255)',
      opacity: 1,
      hoverStyle: false,
      specifyBorderRadius: false,
      minSize: false,
      size: '6px',
      disable: false,
    }
  }, // 在这里设置全局默认配置
  name: 'v-scroll' // 在这里自定义组件名字，默认是vueScroll
});  



Vue.prototype.$http = axios;
Vue.prototype.md5 = md5;
Vue.prototype.echarts = echarts


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
