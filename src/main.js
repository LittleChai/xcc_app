import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import Vant from 'vant'
import axios from './http.js'
import 'vant/lib/index.css'
import md5 from 'js-md5'

Vue.config.productionTip = false

Vue.use(Vant);
// Vue.use(md5);

Vue.prototype.$http = axios;
Vue.prototype.md5 = md5;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
