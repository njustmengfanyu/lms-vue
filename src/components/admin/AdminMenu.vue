<template>
    <el-menu
        :default-active="currentPath"
        class="el-menu-admin"
        router
        withCredentials
        mode="vertical"
        background-color="#8ed0e1"
        text-color="#000"
        active-text-color="#fff"
        :collapse="isCollapse">
        <div style="height: 80px;"></div>
        <!--index 没有用但是必需字段-->
        <el-submenu v-for="(item,i) in adminMenus" :key="i" :index="(i).toString()" style="text-align: left">
        <template slot="title" style="font-size: 17px;">
          <i :class="item.iconCls"></i>
            <span>{{ item.nameZh }}</span>
        </template>
            <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
                <i :class="child.icon"></i>
                {{ child.nameZh }}
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    name: 'AdminMenu',
    data() {
        return {
            isCollapse: false
        }
    },
    computed: {
        adminMenus() {
            return this.$store.state.adminMenus
        },
        currentPath() {
            return this.$route.path
        }
    }
}
</script>

<style scoped>
.el-menu-admin {
    border-radius: 5px;
    height: 670px;
    width: 220px;
    margin-left: 15px;
    /*padding-top: 15px;*/
}
</style>
