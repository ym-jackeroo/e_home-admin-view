<template>
    <div class="news-detail">
        <el-card>
            <div slot="header" class="header">
                <div class="title" v-if="!edit">
                    {{this.$route.meta.title}}
                </div>
                <div class="title" v-else>
                    新闻编辑
                </div>
                <el-button type="text" @click="handleEdit" v-if="!edit">
                    编辑
                </el-button>
                <el-button type="text" @click="handleSave" v-else>
                    保存
                </el-button>
            </div>
            <div class="detail" v-if="!edit">   
                <div class="img">
                    <img :src="newsDetail.img" alt="">
                </div>
                <div class="title">
                    <h1>{{newsDetail.title}}</h1>
                </div>
                <div class="news-msg">
                    <div class="author">
                        作者:{{newsDetail.author.nickname}}
                    </div>
                    <div class="type">
                        分类:{{newsDetail.type.title}}
                    </div>
                </div>
                <div v-html="newsDetail.content" class="content">

                </div>
            </div>
            <div class="edit" v-else>
                <el-form :model="newsDetail" label-width="200px">
                    <el-form-item label="新闻头图">
                        <upload-avatar v-model="newsDetail.img"></upload-avatar>
                    </el-form-item>
                    <el-form-item label="新闻标题">
                        <el-input v-model="newsDetail.title"></el-input>
                    </el-form-item>
                    <el-form-item label="新闻作者">
                        <el-select v-model="newsDetail.author._id">
                            <el-option
                            v-for="item in users"
                            :key="item._id"
                            :value="item._id"
                            :label="item.nickname"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="新闻分类">
                        <el-select v-model="newsDetail.type._id">
                            <el-option
                            v-for="item in category"
                            :key="item._id"
                            :value="item._id"
                            :label="item.title"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="新闻内容">
                        <quill-editor v-model="contentData"></quill-editor>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import quillEditor from '@/components/quill-editor'
import uploadAvatar from '@/components/upload-avatar'

export default {
    data() {
        return {
            newsDetail: {
                img: '',
                title: '',
                author: '',
                type: '',
                content: '',
                contentText: ''
            },
            edit: false,
            users: [],
            category: [],
            contentData: {
                content: '',
                contentText: ''
            }
        }
    },
    components: {
        "upload-avatar": uploadAvatar,
        "quill-editor": quillEditor
    },
    methods: {
        getNewsDetail() {
            this.$axios.get(`/admin/news/${this.$route.query.id}`).then(res => {
                console.log(res)
                if(res.code == 200) {
                    this.newsDetail = <res className="data"></res>
                    this.newsDetail.author._id = res.data.author._id
                    this.newsDetail.type._id = res.data.type._id
                } else if(res.code == 403) {
                    this.$message(res.msg)
                    this.$router.push('/')
                }
            })
        },
        handleEdit() {
            this.edit = true
            this.contentData.content = this.newsDetail.content
            this.contentData.contentText = this.newsDetail.contentText
        },
        handleSave() {
            this.$axios.post('/admin/news/update', this.newsDetail).then(res => {
                console.log(res)
                if(res.code == 200) {
                    this.$message.success(res.msg)
                    this.edit = false
                    this.getNewsDetail()
                } else if(res.code == 403) {
                    this.$message(res.msg)
                    this.$router.push('/')
                }
            })
        },
        getUser() {
            this.$axios.get('/admin/adminUser', {page_size: 100}).then(res => {
                console.log(res)
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
                console.log(res)
                if(res.code == 200) {
                    this.category = res.data
                } else if(res.code == 403) {
                    this.$message(res.msg)
                    this.$router.push('/')
                }
            })
        },
    },
    created() {
        this.getNewsDetail()
        this.getUser()
        this.getCategory()
        
    },
    watch: {
        contentData(val) {
            this.newsDetail.content = this.contentData.content
            this.newsDetail.contentText = this.contentData.contentText 
        }
    }
}
</script>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    height: 18px;

    /deep/ {
        .el-button.el-button--text {
            padding: 0;
            height: 18px;

            span {
                display: block;
                height: 18px;
            }
        }
    }
}

.detail {

    .img {
        width: 200px;
        height: 200px;
        margin: 0 auto;

        img {
            display: block;
            width: 200px;
            height: 200px;
        }
    }

    .title {

        h1 {
            text-align: center;
        }
    }

    .news-msg {
        text-align: center;
        width: 550px;
        margin: 0 auto;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;

    }

    .content {
        /deep/ {
            img {
                display: block;
                margin: 0 auto;
                width: 550px;
                margin-bottom: 10px;
            }

            p {
                line-height: 30px;
                margin: 0 200px;
                margin-bottom: 10px;
            }
        }
    }
}

</style>
