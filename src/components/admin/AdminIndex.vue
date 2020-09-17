<template>
    <el-container id="admin-body">
        <el-header style="z-index: 1;height: 80px;margin-left: -20px">
            <Header style="position: absolute;width: 98%;"></Header>
        </el-header>
        <el-container>
            <el-aside style="height: 100%;margin-top: 0;width: 250px">
                <AdminMenu @indexSelect="listByCategory" ref="adminmenu"></AdminMenu>
            </el-aside>
            <el-main>
<!--                <AdminMenu class="adminmenu" ref="adminmenubar"></AdminMenu>-->
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import AdminMenu from './AdminMenu'
import Header from './Header'

export default {
    name: 'AdminIndex',
    components: {AdminMenu, Header},
    data() {
        return {
            dialogVisible: false
        }
    },
    mounted() {
        // this.$router.replace('/admin/dashboard')
    },
    methods: {
        listByCategory() {
            let _this = this;

        }
    }
}
</script>

<style scoped>
#admin-body {
    height: 95vh;
}
</style>
