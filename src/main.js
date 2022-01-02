import Vue from 'vue'
import Axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router/index.js'
import '../public/reset.css'

Vue.use(ElementUI);
Vue.prototype.$axios = Axios;
Vue.config.productionTip = false;


Axios.defaults.baseURL = '/api';//默认链接
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Vue.prototype.$axios = Axios;


new Vue({
    el: '#app',
  router,
  render: h => h(App)
}).$mount('#app');
