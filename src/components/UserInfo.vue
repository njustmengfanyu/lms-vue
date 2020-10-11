<template>
    <div class="userinfo">
        <el-card style="width: 500px;margin: 0 auto;position: relative;top: 50%;background-color: #f0f6fc">
            <el-form v-model="form" style="text-align: left" ref="dataForm">
                <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                    <el-input v-model="form.username" autocomplete="off" :placeholder="dialogForm_username" readonly></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off" :placeholder="dialogForm_name" readonly></el-input>
                </el-form-item>
                <el-form-item label="电话号码" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="form.phone" autocomplete="off" :placeholder="dialogForm_phone" readonly></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                    <el-input v-model="form.email" autocomplete="off" :placeholder="dialogForm_email" readonly></el-input>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "UserInfo",
    data() {
        return {
            formLabelWidth: '80px',
            dialogForm_username: '',
            dialogForm_name: '',
            dialogForm_phone: '',
            dialogForm_email: '',
            form: {

            },
            readonly:true
        }
    },
    mounted() {
        this.query()
    },
    methods: {
        query() {
            let _this = this
            this.$axios.post('userinfo', {username:_this.$store.state.username}).then(
                resp => {
                    if (resp.data.code === 200) {
                        this.form = resp.data.data
                    }
                }
            )
        }
    }
}
</script>

<style scoped >
.userinfo {
    width: 550px;
    height: 100px;
    margin:0 auto;
}
</style>
