<template>
    <div id="paper">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" class="login-container">
            <h3 class="login_title">用户注册</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username"
                          auto-complete="off" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password"
                          auto-complete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="name">
                <el-input type="text" v-model="loginForm.name"
                          auto-complete="off" placeholder="真实姓名"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
                <el-input type="text" v-model="loginForm.phone"
                          auto-complete="off" placeholder="电话号码"></el-input>
            </el-form-item>
            <el-form-item prop="email">
                <el-input type="text" v-model="loginForm.email"
                          auto-complete="on" placeholder="电子邮箱"></el-input>
            </el-form-item>
            <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 80%;background: #3d94e3;border: none"
                           @click="register('loginForm')">注册
                </el-button>
            </el-form-item>
            <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 60%;background: #5c5659;border: none" @click="back()">已有账户，快来登录吧
                </el-button>
            </el-form-item>
            <p>注册成功后页面会自动跳转哦！</p>
        </el-form>
    </div>
</template>
<script>
export default {
    name: "register",
    data() {
        const enName = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入真实姓名'))
            } else {
                const reg1 = /^[a-zA-Z]+$/ // 验证没有空格的英文名
                const reg2 = /^[a-zA-Z][A-Za-z\s]*[a-zA-Z]*$/
                const reg3 = /^[\u4e00-\u9fa5]+$/
                if (value.length < 100 && (reg1.test(value) || reg2.test(value) || reg3.test(value))) {
                    callback()
                } else {
                    return callback(new Error('请输入正确的名字'))
                }
            }
        }
        return {

            loginForm: {
                username: '',
                password: '',
                name: '',
                phone: '',
                email: ''
            },
            rules: {
                username: [{required: true, message: '账号不能为空', trigger: 'blur'},],
                password: [{required: true, message: '密码不能为空', trigger: 'blur'},],
                name: [{required: true, validator:enName, trigger: 'change'},],
                phone: [{required: true, message: '电话号码不能为空', trigger: 'change'},
                    {
                        pattern: /^0?(13[0-9]|15[7-9]|153|156|18[7-9]|198)[0-9]{8}$/,
                        min: 11,
                        max: 11,
                        message: '输入的手机号码有误',
                        trigger: 'blur'
                    }],
                email: [{required: true, message: '邮箱地址不能为空', trigger: 'change'},
                    {pattern: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g, message: '邮箱地址有误'}],
            },
            checked: true
        }
    },
    methods: {
        register(formName) {
            const _this = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post('/register', this.loginForm).then((resp) => {
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
                }
            })
        },
        back() {
            this.$router.replace('/login')
        }
    }
}
</script>

<style>
#paper {
    background: linear-gradient(rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.22)), url("../assets/bgimg.jpg") no-repeat;
    margin: 0;
    border: 0;
    height: 100%;
    width: 100%;
    background-size: 100% 100%;
    position: fixed;
}

.login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 150px auto;
    width: 450px;
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

