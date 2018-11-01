<template>
    <div class="comment-list">
        <el-card>
            <div slot="header">
                {{this.$route.meta.title}}
            </div>
            <div class="topic-wrap">
                <div class="topic-item">
                    <div class="user clearfix">
                        <img :src="userData.avatar" class="avatar fll">
                        <span class="username fll">{{userData.nickname}}</span>
                    </div>
                    <div class="content">
                        {{topicData.content}}
                    </div>
                    <div class="reply-wrap clearfix">
                        <div class="reply flr" @click="handleReply">
                            回复
                        </div>
                        <div class="date flr">
                            {{topicData.format_time}}
                        </div>
                    </div>
                </div>
                <div class="input-box clearfix" v-show="inputShow">
                    <el-input type="textarea" v-model="formData.content"></el-input>
                    <div class="fll packup" @click="handlePackup">↑收起</div>
                    <el-button type="primary" size="mini" class="btn flr" @click="handleComment">评论</el-button>
                </div>
            </div>
            <div class="comment-wrap">
                <div class="comment-item" v-for="item in commentsData" :key="item._id">
                    <div class="user clearfix">
                        <img :src="item.user.avatar" class="avatar fll">
                        <span class="username fll">{{item.user.nickname}}</span>
                    </div>
                    <div class="content">
                        {{item.content}}
                    </div>
                    <div class="reply-wrap clearfix">
                        <div class="delete flr" @click="handleDelete(item._id)">
                            删除
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
      commentsData: [],
      topicData: {},
      userData: {},
      inputShow: false,
      formData: {
        content: '',
        topic_id: ''
      }
    };
  },
  components: {},
  methods: {
    getCommentsData() {
      this.$axios
        .get(`/admin/comment/getComment/${this.$route.query._id}`)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.commentsData = res.data;
          }
        });
    },
    getTopicDate() {
      this.$axios.get(`/admin/topic/${this.$route.query._id}`).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.topicData = res.data;
          this.formData.topic_id = res.data._id;
        }
      });
    },
    getUserData() {
      this.$axios.get(`/admin/adminUser/${this.topicData.user}`).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.userData = res.data;
        }
      });
    },
    handleReply() {
        this.inputShow = true
    },
    handlePackup() {
        this.inputShow = false
    },
    handleComment() {
        this.$axios.post('/admin/comment', this.formData).then(res => {
            console.log(res)
            if(res.code == 200) {
                this.$message.success(res.msg)
                this.getCommentsData()
                this.inputShow = false
                this.formData.content = ''
            }
        })
    },
    handleDelete(_id) {
      this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete(`/admin/comment/${_id}`).then(res => {
          if(res.code == 200) {
            this.$message.success(res.msg)
            this.getCommentsData()
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
    this.getCommentsData();
    this.getTopicDate();
    setTimeout(() => {
      this.getUserData();
    }, 1000);
  }
};
</script>

<style scoped lang="scss">
.topic-item {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;

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
.input-box {
    position: relative;
    padding: 10px;
    background: #f1f1f1;
    border: 1px solid transparent;
    border-radius: 6px;
    box-sizing: border-box;
    margin-bottom: 10px;

    .btn {
        margin-top: 5px;
    }

    .packup {
        position: absolute;
        left: 12px;
        bottom: 10px;
        font-size: 12px;
        color: #999;
        cursor: pointer;
    }

    .packup:hover {
        color: #409eff;
    }
}

.comment-item {
  background: #f1f1f1;
  width: 100%;
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 10px 20px;
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

    .delete {
      font-size: 12px;
      line-height: 20px;
      cursor: pointer;
    }

    .delete:hover {
      color: red;
    }
  }
}
</style>
