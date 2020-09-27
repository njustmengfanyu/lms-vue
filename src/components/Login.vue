<template>
    <div class="poster">
    <el-form :model="loginForm" :rules="loginrule" class="login-container" label-position="left"
             label-width="0px">
        <h3 class="login_title">系统登录</h3>
        <el-form-item prop="username">
            <el-input type="text"  v-model="loginForm.username"
                      auto-complete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password"
                      auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
            <el-button type="primary" style="width: 100%;background: #7c64ff;border: none" v-on:click="login">登录
            </el-button>
            <div class="space">
            </div>
            <el-button type="primary" style="width: 100%;background: #505458;border: none" @click="register">没有账号？还不快来注册！
            </el-button>
            <div class="space">
            </div>
            <el-button type="primary" style="width: 100%;background: #e85e5e;border: none" @click="forget">忘记密码了？试试来找回
            </el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            loginrule: {
                username: {require: true,message:"用户名不能为空"}
            },
            responseResult: []
        }
    },
    methods: {
        /**
         * 受到后端返回的成功代码时，触发store中的login()方法，把loginForm对象传递给store中的user对象
         * 获取登录前页面的路径并跳转，如果该路径不存在，则跳转到首页
         */
        login() {
            let _this = this;
            console.log(this.$store.state)
            this.$axios
                .post('/login', {
                    username: this.loginForm.username,
                    password: this.loginForm.password
                })
                .then(successResponse => {
                    if (successResponse.data.code === 200) {
                        let un = this.loginForm.username
                        this.$msgbox.alert("登录成功，欢迎" + un)
                        _this.$store.commit('login', un)
                        let path = this.$route.query.redirect
                        this.$router.replace({path: path === '/' || path === undefined ? '/library' : path})
                    } else if (_this.loginForm.username === '' || _this.loginForm.username === ''){
                        this.$message.error("用户名或密码不能为空哦")
                    } else {
                        this.$message.error("用户名或密码不正确哦")
                    }
                })
                .catch(failResponse => {
                })
        },
        register() {
            this.$router.replace('/register')
        },
        forgrt() {

        }
    }
}
</script>

<style scoped>

.poster {
    background: linear-gradient(rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.22)),url("../assets/bgimg.jpg") no-repeat ;

    margin: 0;
    border: 0;
    height: 100%;
    width: 100%;
    background-size:100% 100%;
    position: fixed;
}

.poster .space {
    height: 20px;
}

.login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 150px auto;
    width: 450px;
    padding: 25px 35px 5px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}

.login_title {
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
}

</style>
