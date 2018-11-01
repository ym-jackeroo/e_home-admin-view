<template>
    <div class="change-pass">
        <el-card>
            <div slot="header">
                {{this.$route.meta.title}}
            </div>
            <el-form :model="formData" label-width="200px">
                <el-form-item label="旧密码">
                    <el-input v-model="formData.oldPass"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="formData.newPass"></el-input>
                </el-form-item>
                <el-form-item label="再次输入">
                    <el-input v-model="repeat"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleChange">确认修改</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                oldPass: '',
                newPass: '',
                _id: this.$store.state.user._id
            },
            repeat: ''
        }
    },
    components: {

    },
    methods: {
        handleChange() {
            if(this.formData.oldPass&&this.formData.newPass&&this.repeat) {
                if(this.formData.newPass == this.repeat) {
                    this.$axios.post('/admin/adminUser/changePass', this.formData).then(res => {
                        if(res.code == 200) {
                            this.$message.success(res.msg)
                            this.$router.push('/')
                        } else {
                            this.$message.warning(res.msg)
                        }
                    })
                }else {
                    this.$message("两次输入的密码不一致")
                }
            }else {
                this.$message.info("请输入全部信息")
            }
            
        }
    }
}   
</script>

<style scoped lang="scss">
</style>
