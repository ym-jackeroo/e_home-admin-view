<template>
    <div class="admin-detail">
        <el-card>
            <div slot="header" class="header"> 
                <div class="title" v-if="!edit">
                    {{this.$route.meta.title}}
                </div>
                <div class="title" v-else>
                    修改管理员信息
                </div>
                <div v-if="!edit">
                    <el-button type="text" @click="handleEdit">编辑</el-button>
                </div>
                <div v-else>
                    <el-button type="text" @click="handleSave">保存</el-button>
                </div>
            </div>
            <div class="detail" v-if="!edit">
                <el-form label-width="200px">
                    <el-form-item label="管理员头像">
                        <img :src="adminDetail.avatar" alt="">
                    </el-form-item>
                    <el-form-item label="管理员用户名">
                        <el-input v-model="adminDetail.username" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="管理员昵称">
                        <el-input v-model="adminDetail.nickname" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="adminDetail.sex">
                            <el-radio :label="1" disabled>男</el-radio>
                            <el-radio :label="0" disabled>女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="adminDetail.phone" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="职业">
                        <el-input v-model="adminDetail.job" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="个人描述">
                        <el-input type="textarea" v-model="adminDetail.desc" disabled></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="edit" v-else>
                <el-form label-width="200px">
                    <el-form-item label="管理员头像">
                        <upload-avatar v-model="adminDetail.avatar"></upload-avatar>
                    </el-form-item>
                    <el-form-item label="管理员用户名">
                        <el-input v-model="adminDetail.username"></el-input>
                    </el-form-item>
                    <el-form-item label="管理员昵称">
                        <el-input v-model="adminDetail.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="adminDetail.sex">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="0">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="adminDetail.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="职业">
                        <el-input v-model="adminDetail.job"></el-input>
                    </el-form-item>
                    <el-form-item label="个人描述">
                        <el-input type="textarea" v-model="adminDetail.desc"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import uploadAvatar from '@/components/upload-avatar'

export default {
    data() {
        return {
            adminDetail: {
                username: '',
                nickname: '',
                avatar: '',
                desc: '',
                job: '',
                phone: '', 
                sex: 0
            },
            edit: false
        }
    },
    components: {
        "upload-avatar": uploadAvatar
    },
    methods: {
        getAdminDetail() {
            this.$axios.get(`/admin/adminUser/${this.$route.query.id}`).then(res => {
                console.log(res)
                if(res.code == 200) {
                    this.adminDetail = res.data
                } else if(res.code == 403) {
                    this.$message(res.msg)
                    this.$router.push('/')
                }
            })
        },
        handleEdit() {
            this.edit = true
        },
        handleSave() {
            this.$axios.post('/admin/adminUser/update', this.adminDetail).then(res => {
                console.log(res)
                if(res.code == 200) {
                    this.$message.success(res.msg)
                    this.edit = false
                } else if(res.code == 403) {
                    this.$message(res.msg)
                    this.$router.push('/')
                }
            })
        }
    },
    created() {
        this.getAdminDetail()
    },
}
</script>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    height: 18px;

    /deep/ {
        .el-button {
            height: 18px;
            padding: 0;
            box-sizing: border-box;

            span {
                display: block;
                height: 18px;
            }
        }
    }
}

.detail {
    img {
        display: block;
        width: 178px;
        height: 178px;
        border-radius: 5px;
    }
}
</style>
