<template>
    <div class="poster">
        <el-form :model="loginForm" :rules="loginrule" class="login-container" label-position="left"
                 label-width="0px">
            <h3 class="login_title">忘记密码</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username"
                          auto-complete="off" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item
                prop="seccode"
                class="inputbar"
            >
                <el-input
                    class="log-input"
                    v-model="loginForm.seccode"
                    placeholder="请输入验证码  区分大小写"
                    @keydown.enter.native="reset('loginForm')"
                >
                </el-input>
                <span class="checkCode" style="font-size: 18px;cursor: pointer" @click="createCode">验证码 : {{checkCode}}  点击刷新验证码</span>
            </el-form-item>
            <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 100%;background: #7c64ff;border: none" v-on:click="reset">重置密码
                </el-button>
            </el-form-item>
            <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 100%;background: #1fc749;border: none" v-on:click="back()">返回登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {MessageBox} from 'element-ui'
import {Message} from 'element-ui'
export default {
    name: "Forget",
    data() {
        return {
            loginForm: {
                username: '',
                seccode:''
            },
            loginrule: {
                username: {require: true, message: "用户名不能为空"}
            },
            responseResult: [],
            checkCode:'',
        }
    },
    mounted() {
        this.createCode();
    },
    methods: {
        reset() {
            if(this.loginForm.seccode !== this.checkCode) {
                MessageBox.alert(
                    "验证码错误，注意大写字母"
                );
                this.createCode();
                return false
            }
            this.$axios
                .put('/user/password', {
                    username: this.loginForm.username
                })
                .then(resp => {
                    if (resp.status === 200) {
                        this.$msgbox.alert("重置密码成功，新密码是123")
                        this.$router.replace('/login')
                    } else if (_this.loginForm.username === '') {
                        this.$message.error("用户名不能为空哦")
                    }
                })
        },
        createCode() {
            let code = "";
            const codeLength = 4; //验证码的长度
            const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; //随机数
            for(let i = 0; i < codeLength; i++) { //循环操作
                let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）
                code += random[index]; //根据索引取得随机数加到code上
            }
            this.checkCode = code; //把code值赋给验证码
        },
        back() {
            this.$router.replace('/login')
        }
    }
}
</script>

<style scoped>

.login-code {
    cursor: pointer;
}

.poster {
    background: linear-gradient(rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.22)), url("../assets/bgimg.jpg") no-repeat;

    margin: 0;
    border: 0;
    height: 100%;
    width: 100%;
    background-size: 100% 100%;
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
