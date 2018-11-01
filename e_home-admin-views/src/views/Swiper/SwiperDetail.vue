<template>
    <div class="swiper-detail">
        <el-card>
            <div slot="header" class="header">
                <div class="title" v-if="!edit">
                    {{this.$route.meta.title}}
                </div>
                <div class="title" v-else>
                    轮播图编辑
                </div>
                <el-button type="text" @click="handleEdit" v-if="!edit">
                    编辑
                </el-button>
                <el-button type="text" @click="handleSave" v-else>
                    保存
                </el-button>
            </div>
            <div class="detail" v-if="!edit">
                <el-form :model="swiperData" label-width="200px">
                    <el-form-item label="轮播图">
                        <img :src="swiperData.img" alt="">
                    </el-form-item>
                    <el-form-item label="轮播图标题">
                        <el-input v-model="swiperData.title" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="轮播图新闻">
                        <el-input v-model="swiperData.news.title" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="排序">
                    <el-input-number 
                        v-model="swiperData.sort"
                        :min="1"
                        :step="1"
                        disabled>
                        </el-input-number>
                    </el-form-item>
                    <el-form-item label="是否显示">
                        <el-switch
                            v-model="swiperData.status"
                            :active-value=1
                            :inactive-value=0
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            disabled>
                        </el-switch>
                    </el-form-item>
                </el-form>
            </div>
            <div class="edit" v-else>
                <el-form :model="swiperData" label-width="200px">
                    <el-form-item label="轮播图">
                        <upload-avatar v-model="swiperData.img"></upload-avatar>
                    </el-form-item>
                    <el-form-item label="轮播图标题">
                        <el-input v-model="swiperData.title"></el-input>
                    </el-form-item>
                    <el-form-item label="轮播图新闻">
                        <el-input v-model="swiperData.news.title"></el-input>
                        <el-button type="text" @click="dialogTableVisible = true">修改新闻</el-button>
                        <el-dialog title="选择新闻" :visible.sync="dialogTableVisible">
                            <el-table :data="news">
                                <el-table-column property="img" label="新闻头图">
                                    <template slot-scope="scope">
                                        <img :src="scope.row.img">
                                    </template>
                                </el-table-column>
                                <el-table-column property="title" label="新闻标题" width="150"></el-table-column>
                                <el-table-column property="author.nickname" label="作者" width="100"></el-table-column>
                                <el-table-column property="type.title" label="分类" width="100"></el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="primary" size="mini" @click="handleSelect(scope.row._id)">选择</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination
                                @current-change="handleCurrentChange"
                                :current-page.sync="currentPage"
                                :page-size="pageSize"
                                layout="prev, pager, next, jumper"
                                :total="total">
                                </el-pagination>
                            </div>
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="排序">
                    <el-input-number 
                        v-model="swiperData.sort"
                        :min="1"
                        :step="1">
                        </el-input-number>
                    </el-form-item>
                    <el-form-item label="是否显示">
                        <el-switch
                            v-model="swiperData.status"
                            :active-value=1
                            :inactive-value=0
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
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
            swiperData: {
                img: '',
                title: '',
                news: '',
                sort: '',
                status: 0
            },
            edit: false,
            dialogTableVisible: false,
            news: [],
            currentPage: 1,
            pageSize: 5,
            total: 0
        }
    },
    components: {
        'upload-avatar': uploadAvatar
    },
    methods: {
        getSwiperItem() {
            this.$axios.get(`/admin/swiper/${this.$route.query.id}`).then(res => {
                console.log(res)
                if(res.code == 200) {
                    this.swiperData = res.data
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
            this.$axios.post('/admin/swiper/update', this.swiperData).then(res => {
                console.log(res)
                if(res.code == 200) {
                    this.$message.success(res.msg)
                    this.edit = false
                } else if(res.code == 403) {
                    this.$message(res.msg)
                    this.$router.push('/')
                }
            })
        },
        getNews() {
            this.$axios.get('/admin/news', {page: this.currentPage, page_size: this.pageSize}).then(res => {
                console.log(res)
                if(res.code == 200) {
                    this.news = res.data
                    this.total = res.count
                } else if(res.code == 403) {
                    this.$message(res.msg)
                    this.$router.push('/')
                }
            })
        },
        handleSelect(id) {
            this.$axios.get(`/admin/news/${id}`).then(res => {
                console.log(res)
                if(res.data == 200) {
                    this.swiperData.news.title = res.data.title
                    this.dialogTableVisible = false
                } else if(res.code == 403) {
                    this.$message(res.msg)
                    this.$router.push('/')
                }
            })
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getNews()
        }
    },
    created() {
        this.getSwiperItem()
        this.getNews()
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

    img {
        display: block;
        width: 178px;
        height: 178px;
        border-radius: 6px;
    }
}

.edit {

    img {
        display: block;
        width: 100px;
        height: 100px;
    }
}
</style>

