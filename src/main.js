import Vue from "vue/dist/vue.esm.js";
import App from "./App";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueRouter from "vue-router";
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueRouter);

let axios = require('axios');
axios.defaults.baseURL = 'http://localhost:8998/api'
axios.defaults.withCredentials = true
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


const formatRoutes = (routes) => {
    let fmtRoutes = []
    if (routes) {
        routes.forEach(route => {
            if (route.children) {
                route.children = formatRoutes(route.children)
            }

            console.log(route.path)
            let fmtRoute = {
                path: route.path,
                component: resolve => {
                    require(['./components/admin/' + route.component + '.vue'], resolve)
                },
                name: route.name,
                name_zh: route.name_zh,
                iconCls: route.iconCls,
                children: route.children
            }
            fmtRoutes.push(fmtRoute)
        })
    }

    return fmtRoutes
}

const initAdminMenu = (router, store) => {
    if (store.state.adminMenus.length > 0) {
        return
    }
    axios.get('/menu').then(resp => {
        if (resp && resp.status === 200) {
            let fmtRoutes = formatRoutes(resp.data.result);
            router.addRoutes(fmtRoutes)
            store.commit('initAdminMenu', fmtRoutes)
        }
    })
}

/**
 * 判断访问的路径是否需要登录，如果需要，判断 store 里有没有存储 user 的信息，如果存在，则放行，否则跳转到登录页面，并存储访问的页面路径
 */
router.beforeEach((to, from, next) => {
        if (store.state.username && to.path.startsWith('/admin')) {
            initAdminMenu(router, store)
        }
        // 已登录状态下访问 login 页面直接跳转到后台首页
        if (store.state.username && to.path.startsWith('/login')) {
            next({
                name: 'admin/dashboard'
            })
        }
        if (to.meta.requireAuth) {
            if (store.state.username) {
                axios.get('/authentication').then(resp => {
                    if (resp) next()
                })
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
