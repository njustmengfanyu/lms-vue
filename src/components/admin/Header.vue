<template>
    <el-card class="admin-header" style="background-color: #fff">
        <span style="font-size: 28px;font-weight: bold;position:absolute;left: 10px">云中书后台</span>
        <a-button type="primary" v-on:click="backward" style="margin-left: 100px; font-size: 18px">
            <a-icon type="left"/>
            返回前台
        </a-button>
        <div class="avatar">
            <el-button circle size="mini" style="float: right;margin-right: 30px;margin-top: -50px">
                <el-dropdown :hide-on-click="false" @command="handleCommand">
                    <div>
                        <el-avatar class="avatar">
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
    </el-card>
</template>

<script>
import {createRouter} from '@/router'

export default {
    name: 'Header',
    data() {
        return {
            press: JSON.parse(window.localStorage.getItem('username' || '[]'))
        }
    },
    methods: {
        logout() {
            let _this = this;
            this.$axios.get('/logout').then(resp => {
                if (resp && resp.data.code === 200) {
                    _this.$store.commit('logout')
                    _this.$router.replace('/index')
                    // 清空路由，防止路由重复加载
                    const newRouter = createRouter()
                    _this.$router.matcher = newRouter.matcher
                }
            }).catch(failResponse => {
            })
        },
        backward() {
            let _this = this;
            _this.$router.replace('/index')
            // 清空路由，防止路由重复加载
            const newRouter = createRouter()
            _this.$router.matcher = newRouter.matcher
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
.admin-header {
    height: 80px;
    opacity: 0.85;
    line-height: 40px;
    margin-left: 15px;
}

.el-icon-switch-button {
    cursor: pointer;
    outline: 0;
}
</style>
