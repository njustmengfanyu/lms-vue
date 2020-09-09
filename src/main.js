import Vue from "vue/dist/vue.esm.js";
import App from "./App";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueRouter from "vue-router";

Vue.use(VueRouter);

var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8998/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios

Vue.config.productionTip = false;

// new Vue({
//   render: h => h(App),
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// }).$mount("#app")

new Vue({
  router,
  el: '#app',
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
}).$mount("#app");
