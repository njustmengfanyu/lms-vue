import Vue from "vue/dist/vue.esm.js";
import App from "./App";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueRouter from "vue-router";
import ElementUi from 'element-ui';
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

/**
 * 判断访问的路径是否需要登录，如果需要，判断 store 里有没有存储 user 的信息，如果存在，则放行，否则跳转到登录页面，并存储访问的页面路径
 */
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
