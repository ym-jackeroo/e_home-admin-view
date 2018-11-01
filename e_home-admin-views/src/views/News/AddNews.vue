<template>
    <div class="add-news">
        <el-card>
            <div slot="header">
                添加新闻
            </div>
            <el-form :model="formData" label-width='200px'>
                <el-form-item label="新闻标题" required>
                    <el-input v-model="formData.title"></el-input>
                </el-form-item>
                <el-form-item label="作者" required>
                    <el-select v-model="formData.author">
                        <el-option 
                        v-for="(item, index) in users"
                        :key="index"
                        :label="item.nickname"
                        :value="item._id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="新闻头图" required>
                    <upload-avatar v-model="formData.img"></upload-avatar>
                </el-form-item>
                <el-form-item label="新闻内容" required>
                    <quill-editor v-model="content"></quill-editor>
                </el-form-item>
                <el-form-item label="新闻类型" required>
                    <el-select v-model="formData.type">
                        <el-option
                        v-for="(item, index) in categories"
                        :key="index"
                        :value="item._id"
                        :label="item.title"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleSubmit" type="primary">提交</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import uploadAvatar from '@/components/upload-avatar'
    import quillEditor from '@/components/quill-editor'
   
    export default {
        data() {
            return {
                content: {},
                categories: '',
                formData: {
                    title: '',
                    content: '',
                    contentText: '',
                    img: '',
                    author: '',
                    type: ''
                },
                users: []
            };
        },
        components: {
            "upload-avatar": uploadAvatar,
            "quill-editor": quillEditor
        },
        methods: {
            getUser() {
                this.$axios.get('/admin/adminUser').then(res => {
                    if(res.code == 200) {
                        this.users = res.data
                    } else if(res.code == 403) {
                        this.$message(res.msg)
                        this.$router.push('/')
                    }
                })
            },
            getCategory() {
                this.$axios.get('/admin/category').then(res => {
                    if(res.code == 200) {
                        this.categories = res.data
                    } else if(res.code == 403) {
                        this.$message(res.msg)
                        this.$router.push('/')
                    }
                })
            },
            handleSubmit() {
                this.$axios.post('/admin/news', this.formData).then(res => {
                    console.log(res)
                    if(res.code == 200) {
                        this.$message.success(res.msg)
                        this.$router.push('/layout/news')
                    } else if(res.code == 403) {
                        this.$message(res.msg)
                        this.$router.push('/')
                    }
                })
            }
        },
        created() {
            this.getUser()
            this.getCategory()
        },
        watch: {
            content(sb) {
                this.formData.content = sb.content
                this.formData.contentText = sb.contentText
            }
        }
    };
</script>

<style scoped lang="scss">
/deep/ {
    .ql-container {
        height: 200px;
    }
}

</style>

