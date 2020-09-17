<template>
    <el-menu
        :default-active="currentPath"
        class="el-menu-admin"
        router
        mode="vertical"
        background-color="rgb(204, 204, 255)"
        text-color="#fff"
        active-text-color="#ffd04b"
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
            isCollapse: false,
            // adminMenus: [
            //     {
            //         "id": 1,
            //         "path": "/admin",
            //         "name": "AdminIndex",
            //         "nameZh": "首页",
            //         "iconCls": "el-icon-s-home",
            //         "component": "AdminIndex",
            //         "parentId": 0,
            //         "children": [
            //             {
            //                 "id": 2,
            //                 "path": "/admin/dashboard",
            //                 "name": "DashboardAdmin",
            //                 "nameZh": "运行情况",
            //                 "iconCls": null,
            //                 "component": "dashboard/admin/index",
            //                 "parentId": 1,
            //                 "children": []
            //             }
            //         ]
            //     },
            //     {
            //         "id": 3,
            //         "path": "/admin",
            //         "name": "User",
            //         "nameZh": "用户管理",
            //         "iconCls": "el-icon-user",
            //         "component": "AdminIndex",
            //         "parentId": 0,
            //         "children": [
            //             {
            //                 "id": 6,
            //                 "path": "/admin/user/profile",
            //                 "name": "Profile",
            //                 "nameZh": "用户信息",
            //                 "iconCls": null,
            //                 "component": "user/UserProfile",
            //                 "parentId": 3,
            //                 "children": []
            //             },
            //             {
            //                 "id": 7,
            //                 "path": "/admin/user/role",
            //                 "name": "Role",
            //                 "nameZh": "角色配置",
            //                 "iconCls": null,
            //                 "component": "user/Role",
            //                 "parentId": 3,
            //                 "children": []
            //             }
            //         ]
            //     },
            //     {
            //         "id": 4,
            //         "path": "/admin",
            //         "name": "Content",
            //         "nameZh": "内容管理",
            //         "iconCls": "el-icon-tickets",
            //         "component": "AdminIndex",
            //         "parentId": 0,
            //         "children": [
            //             {
            //                 "id": 8,
            //                 "path": "/admin/content/book",
            //                 "name": "BookManagement",
            //                 "nameZh": "图书管理",
            //                 "iconCls": null,
            //                 "component": "content/BookManagement",
            //                 "parentId": 4,
            //                 "children": []
            //             },
            //             {
            //                 "id": 9,
            //                 "path": "/admin/content/banner",
            //                 "name": "BannerManagement",
            //                 "nameZh": "广告管理",
            //                 "iconCls": null,
            //                 "component": "content/BannerManagement",
            //                 "parentId": 4,
            //                 "children": []
            //             },
            //             {
            //                 "id": 10,
            //                 "path": "/admin/content/article",
            //                 "name": "ArticleManagement",
            //                 "nameZh": "文章管理",
            //                 "iconCls": null,
            //                 "component": "content/ArticleManagement",
            //                 "parentId": 4,
            //                 "children": []
            //             }
            //         ]
            //     },
            //     {
            //         "id": 5,
            //         "path": "/admin",
            //         "name": "System",
            //         "nameZh": "系统配置",
            //         "iconCls": "el-icon-s-tools",
            //         "component": "AdminIndex",
            //         "parentId": 0,
            //         "children": []
            //     }
            // ]
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
    height: 100%;
}
</style>
