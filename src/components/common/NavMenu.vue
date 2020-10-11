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
        <div class="avatar">
            <el-button circle size="mini" style="float: right;margin-right: 30px">
                <el-dropdown :hide-on-click="false" @command="handleCommand">
                    <div>
                        <el-avatar class="avatar" :size="40" style="background-color: #71adea">
                            {{ press.slice(0,1).toUpperCase() }}
                        </el-avatar>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">
                            <div>
                                个人信息
                            </div>
                        </el-dropdown-item>
                        <el-dropdown-item divided command="b">
                            <div>
                                退出
                            </div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-button>
        </div>

        <span style="position: absolute;padding-top: 10px;right: 47%;font-size: 28px;font-weight: bold">云中书</span>
    </el-menu>
</template>

<script>
export default {
    name: "NavMenu",
    data() {
        return {
            navList: [
                {name: '/index', navItem: '首页'},
                {name: '/wantedlist', navItem: '收藏夹'},
                {name: '/library', navItem: '图书馆'},
                {name: '/userinfo', navItem: '个人中心'},
                {name: '/admin', navItem: '后台管理'}
            ],
            activeIndex: "",
            press: JSON.parse(window.localStorage.getItem('username' || '[]'))
        }
    },
    methods: {
        logout() {
            let _this = this;
            this.$axios.get('/logout').then(resp => {
                if (resp.data.code === 200) {
                    _this.$store.commit('logout')
                    _this.$router.replace('/login')
                }
            })
        },
        handleCommand(command) {
            if (command === "a") {
                this.$router.replace('/userinfo')
            } else if (command === "b") {
                this.logout()
            }
        }

    }
}
</script>

<style scoped>
a {
    text-decoration: none;
}

span {
    pointer-events: none;
}

.el-icon-switch-button {
    cursor: pointer;
    outline: 0;
}

.avatar {
    cursor: pointer;
    outline: 0;
}

</style>
