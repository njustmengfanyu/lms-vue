<template>
<!--   使用router模式时会在激活导航时以index为path进行跳转-->
    <el-menu
        :default-active="$route.path"
        router
        mode="horizontal"
        background-color="white"
        text-color="#222"
        active-text-color="red"
        style="min-width: 1300px; background:transparent">
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
            {{ item.navItem }}
        </el-menu-item>
        <el-button type="danger" icon="el-icon-switch-button" circle v-on:click="logout" style="font-size: 24px;float: right;margin-right: 30px;margin-top: 5px"></el-button>
<!--        <i class="el-icon-switch-button" v-on:click="logout" style="font-size: 40px;float: right;margin-right: 10px;margin-top: 10px"></i>-->
<!--        <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M511.981761 1024a811.427093 811.427093 0 0 0-511.981761-176.249721V300.825763a811.427093 811.427093 0 0 1 511.981761 176.249721A811.491091 811.491091 0 0 1 1023.963521 300.825763v546.924516A811.491091 811.491091 0 0 0 511.981761 1024z m415.98518-621.161871a704.614898 704.614898 0 0 0-355.507335 148.794699L511.981761 600.687081l-60.477846-49.054253A704.486903 704.486903 0 0 0 95.99658 402.838129v353.747398a908.767625 908.767625 0 0 1 415.985181 148.122723 908.767625 908.767625 0 0 1 415.98518-148.122723V402.838129zM511.469779 298.361851a149.178686 149.178686 0 1 1 149.146687-149.178686 149.306681 149.306681 0 0 1-149.146687 149.178686z" fill="#0590DF" style="float:right;color: #222;padding-top: 8px"></path></svg>-->
        <span style="position: absolute;padding-top: 10px;right: 44.8%;font-size: 28px;font-weight: bold">图书管理系统</span>
        <span style="position: absolute;padding-top: 18px;right: 12%;font-size: 18px">当前用户:{{press}}</span>
    </el-menu>
</template>

<script>
export default {
    name: "NavMenu",
    data () {
        return {
            navList: [
                {name: '/index', navItem: '首页'},
                {name: '/wantedlist', navItem: '收藏夹'},
                {name: '/library', navItem: '图书馆'},
                {name: '/admin', navItem: '个人中心'}
            ],
            activeIndex: "",
            press: JSON.parse(window.localStorage.getItem('username' || '[]'))
        }
    },
    methods: {
        logout () {
            let _this = this;
            this.$axios.get('/logout').then(resp => {
                if (resp.data.code === 200) {
                    // 前后端状态保持一致
                    _this.$store.commit('logout')
                    _this.$router.replace('/login')
                }
            })
        }

    }
}
</script>

<style scoped>
a{
    text-decoration: none;
}

span {
    pointer-events: none;
}

.el-icon-switch-button {
    cursor: pointer;
    outline:0;
}

</style>
