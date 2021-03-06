import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = 'http://127.0.0.1:11333/api/private/v1'
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  let t = sessionStorage.getItem('token')
  if (t) config.headers = {
    Authorization: t
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false
import './assets/common.css'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')