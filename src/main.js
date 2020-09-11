import Vue from "vue/dist/vue.esm.js";
import App from "./App";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueRouter from "vue-router";
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueRouter);

var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8998/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios

Vue.config.productionTip = false;

Vue.use(ElementUi)

// new Vue({
//   render: h => h(App),
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// }).$mount("#app")

router.beforeEach((to, from, next) => {
        if (to.meta.requireAuth) {
            if (store.state.user.username) {
                next()
            } else {
                next({
                    path: 'login',
                    query: {redirect: to.fullPath}
                })
            }
        } else {
            next()
        }
    }
)
new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
    components: {App},
    template: '<App/>'
}).$mount("#app");
