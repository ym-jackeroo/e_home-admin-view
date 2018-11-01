<template>
<div class="add-admin">
    <el-card>
        <div slot="header">
            添加管理员
        </div>
        <el-form :model="formData" label-width="200px">
            <el-form-item label="用户名" required>
                <el-input v-model="formData.username" width="300px"></el-input>
            </el-form-item>
            <el-form-item label="密码" required>
                <el-input v-model="formData.password"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="formData.nickname"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="formData.sex">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="formData.phone"></el-input>
            </el-form-item>
            <el-form-item label="头像">
                <upload-avatar v-model="formData.avatar"></upload-avatar>
            </el-form-item>
            <el-form-item label="个人描述">
                <el-input type="textarea" v-model="formData.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </el-card>
 </div>
</template>

<script>
import uploadAvatar from '@/components/upload-avatar'

export default {
    data() {
        return {
            formData: {
                username: '',
                password: '',
                nickname: '',
                sex: '',
                phone: '',
                avatar: '',
                desc: '',
                job: ''
            }
        }
    },
    components: {
        "upload-avatar": uploadAvatar
    },
    methods: {
        handleSubmit() {
            this.$axios.post('/admin/adminUser', this.formData).then(res => {
                console.log(res)
                if(res.code == 200) {
                    this.$message.success(res.msg)
                    this.$router.push('/layout/admin')
                } else if(res.code == 403) {
                    this.$message(res.msg)
                    this.$router.push('/')
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
</style>
