<template>
    <div id="paper">
    <el-form :model="loginForm" :rules="rules" class="login-container" label-position="left"
             label-width="0px" v-loading="loading">
        <h3 class="login_title">用户注册</h3>
        <el-form-item prop="loginForm.username">
            <el-input type="text" v-model="loginForm.username"
                      auto-complete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="loginForm.password">
            <el-input type="password" v-model="loginForm.password"
                      auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="text" v-model="loginForm.name"
                      auto-complete="off" placeholder="真实姓名"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="text" v-model="loginForm.phone"
                      auto-complete="off" placeholder="电话号码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="text" v-model="loginForm.email"
                      auto-complete="off" placeholder="E-Mail"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
            <el-button type="primary" style="width: 40%;background: #505458;border: none" v-on:click="register">注册</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>
<script>
export default{
    name: "register",
    data () {
        return {
            loginForm: {
                username: '',
                password: '',
                name: '',
                phone: '',
                email: ''
            },
            rules: {
                username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
                password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
            },
            checked: true,
            loading: false
        }
    },
    methods: {
        register () {
            let _this = this;
            this.$axios
                .post('/register', {
                    username: this.loginForm.username,
                    password: this.loginForm.password,
                    name: this.loginForm.name,
                    phone: this.loginForm.phone,
                    email: this.loginForm.email
                })
                .then(resp => {
                    if (resp.data.code === 200) {
                        this.$alert('注册成功', '提示', {
                            confirmButtonText: '确定'
                        })
                        _this.$router.replace('/login')
                    } else {
                        this.$alert(resp.data.message, '提示', {
                            confirmButtonText: '确定'
                        })
                    }
                })
                .catch(failResponse => {})
        }
    }
}
</script>
<style>
#paper {
    background: url("../assets/bgimg.jpg") no-repeat ;
    margin: -8px;
    border: 0;
    height: 100%;
    width: 100%;
    background-size:100% 100%;
    position: fixed;
}
.login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
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

