<template>
  <el-card class="admin-header">
    <span style="font-size: 28px;font-weight: bold;position:absolute;left: 10px">图书管理系统后台</span>
      <a-button type="primary" v-on:click="backward" style="margin-left: 100px">
          <a-icon type="left" />返回前台
      </a-button>
    <i class="el-icon-switch-button" v-on:click="logout" style="font-size: 40px;float: right"></i>
  </el-card>
</template>

<script>
  import {createRouter} from '@/router'

  export default {
    name: 'Header',
    methods: {
      logout () {
          let _this = this;
          this.$axios.get('/logout').then(resp => {
          if (resp && resp.data.code === 200) {
            _this.$store.commit('logout')
            _this.$router.replace('/index')
            // 清空路由，防止路由重复加载
            const newRouter = createRouter()
            _this.$router.matcher = newRouter.matcher
          }
        }).catch(failResponse => {})
      },
      backward () {
          let _this = this;
          _this.$router.replace('/index')
          // 清空路由，防止路由重复加载
          const newRouter = createRouter()
          _this.$router.matcher = newRouter.matcher
      }
    }
  }


</script>

<style scoped>
  .admin-header {
    height: 80px;
    opacity: 0.85;
    line-height: 40px;
    min-width: 900px;
  }
  .el-icon-switch-button {
    cursor: pointer;
    outline:0;
  }
</style>
