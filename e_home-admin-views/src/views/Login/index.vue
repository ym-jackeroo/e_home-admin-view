<template>
<div class="login">
    <div class="login-wrap">
        <h2>党建e家后台管理系统</h2>
        <el-form :model="formData">
            <el-form-item label="用户名">
                <el-input v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formData.password" type="password" @keyup.enter.native="handleLogin"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin" class="btn" >
                    登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
 </div>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                username: 'admin',
                password: 'admin'
            }
        };
    },
    components: {},
    methods: {
        handleLogin() {
            this.$axios.post('/admin/adminUser/login', this.formData).then(res => {
                console.log(res)
                if(res.code == 200) {
                    this.$store.commit('sessionUser', res.data)
                    this.$message.success(res.msg)
                    this.$router.push('/layout/home')
                }else if(res.code == 400) {
                    this.$message('请填写您的用户名与密码')
                }else if(res.code == 401) {
                    this.$message.warning(res.msg)
                }else {
                    this.$message.error(res.msg)
                }
            })
        }
    }
};
</script>

<style scoped lang="scss">
.login {
    overflow: hidden;
    height: 100vh;
    background: #2d3a4b;

    h2 {
        color: #fff;
        text-align: center;
        font-weight: 400;
    }

    .login-wrap {
        padding: 30px;
        width: 500px;
        height: 400px;
        box-sizing: border-box;
        border-radius: 6px;
        border: 1px solid #f1f1f1;
        margin: 100px auto;

        /deep/ {
            .el-input {
                background: #2d3a4b;
                border: none;
            }

            .el-form-item__label {
                color: #fff;

            }
        }

        .btn {
            display: block;
            width: 100%;
            box-sizing: border-box;
        }
    }
}
</style>
