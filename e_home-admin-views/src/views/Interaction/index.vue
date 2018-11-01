<template>
    <div class="iteraction">
        <el-card>
            <div slot="header" class="header">
                <div class="title">
                    {{this.$route.meta.title}}
                </div>
                <div class="btn" @click="handleRelease">
                    发布主题
                </div>
            </div>
            <div class="topic-wrap">
                <div class="topic-item" v-for="item in topicData" :key="item._id">
                    <div class="user clearfix">
                        <img :src="item.user.avatar" class="avatar fll">
                        <span class="username fll">{{item.user.nickname}}</span>
                        <div class="delete flr" @click="handleDelete(item._id)">
                            删除
                        </div>
                    </div>
                    <div class="content">
                        {{item.content}}
                    </div>
                    <div class="reply-wrap clearfix">
                        <div class="reply flr" @click="handleReply(item._id)">
                            回复{{item.comment.length}}
                        </div>
                        <div class="date flr">
                            {{item.format_time}}
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            topicData: [],
            commentsData: [],
            formData: {
                content: ''
            }
        }
    },
    components: {

    },
    methods: {
        getInteraction() {
            this.$axios.get('/admin/topic').then(res => {
                console.log(res)
                if(res.code == 200) {
                    this.topicData = res.data
                }
            })
        },
        handleReply(_id) {
            this.$router.push({path: '/layout/commentList', query: {_id}})
        },
        handleRelease() {
            this.$prompt('请输入主题内容', '发布主题', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(({ value }) => {
                if(value) {
                    this.formData.content = value
                    this.$axios.post('/admin/topic', this.formData).then(res => {
                        console.log(res)
                        if(res.code == 200) {
                            this.$message.success(res.msg)
                            this.getInteraction()
                        }
                    })
                } else {
                    this.$message('主题内容不能为空')
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消发布'
                });       
            });
        },
        handleDelete(id) {
            this.$confirm('此操作将永久删除该主题(包括主题下的评论), 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            this.$axios.delete(`/admin/topic/${id}`).then(res => {
                if(res.code == 200) {
                    this.$message.success(res.msg)
                    this.getInteraction()
                }
            })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
        }
    },
    created() {
        this.getInteraction()
    }
}
</script>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    line-height: 18px;

    .btn {
        font-size: 12px;
        cursor: pointer;
    }

    .btn:hover {
        color: #409eff;
    }
}

.topic-wrap {
    .topic-item {
        width: 100%;    
        border: 2px solid #f1f1f1;
        padding: 10px;
        box-sizing: border-box;
        margin-bottom: 10px;

        .user {
            position: relative;
            height: 50px;

            .avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }

            .username {
                position: absolute;
                top: 50%;
                left: 80px;
                transform: translate(-50%, -50%);
            }

            .delete {
                font-size: 12px;
                cursor: pointer;            }

            .delete:hover {
                color: red;
            }
        }

        .content {
            line-height: 20px;
            color: #444;
            margin-left: 60px;
            margin-bottom: 10px;
        }
        
        .reply-wrap {
            height: 20px;
            box-sizing: border-box;

            .date {
                margin-right: 15px;
                line-height: 20px;
                font-size: 12px;
                color: #666;
            }

            .reply {
                line-height: 20px;
                font-size: 12px;
                color: #666;
            }

            .reply:hover {
                color: #409eff;
                cursor: pointer;
            }
        }

    }
}
</style>
