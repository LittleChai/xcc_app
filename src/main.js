import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import axios from './http.js'
import md5 from 'js-md5'
import echarts from 'echarts'
import iview from 'iview'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.use(iview);

Vue.prototype.$http = axios;
Vue.prototype.md5 = md5;
Vue.prototype.echarts = echarts


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
