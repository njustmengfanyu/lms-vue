import Vue from "vue";
import App from "./App";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8998/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount("#app");
