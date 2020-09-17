import Vue from "vue/dist/vue.esm.js";
import Vuex from "vuex";
import router from '@/router'

Vue.use(Vuex);

/**
 * localStorage，即本地存储，在项目打开的时候会判断本地存储中是否有 user 这个对象存在，如果存在就取出来并获得 username 的值，否则则把 username设置为空
 * 只要不清除缓存，登录的状态就会一直保存。
 */

export default new Vuex.Store({
  state: {
      username: window.localStorage.getItem('username') == null ? '' : JSON.parse(window.localStorage.getItem('username' || '[]')),
      adminMenus: []
  },
  mutations: {
    login (state, data) {
      state.username = data
      window.localStorage.setItem('username', JSON.stringify(data))
    },
    logout (state) {
      state.username = ''
      window.localStorage.removeItem('username')
      state.adminMenus = []
    },
    initAdminMenu (state, menus) {
      state.adminMenus = menus
    }

  },
  actions: {},
  modules: {}
});
