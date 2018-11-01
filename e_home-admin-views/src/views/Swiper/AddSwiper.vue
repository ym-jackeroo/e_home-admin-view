<template>
    <div class="add-swiper">
        <el-card>
            <div slot="header">
                添加轮播图
            </div>
            <el-form :model="formData" label-width="200px">
                <el-form-item label="轮播图" required>
                    <upload-avatar v-model="formData.img"></upload-avatar>
                </el-form-item>
                <el-form-item label="轮播图标题" required>
                    <el-input v-model="formData.title"></el-input>
                </el-form-item>
                <el-form-item label="新闻" required>
                    <!-- <el-select v-model="formData.news">
                        <el-option
                        v-for="item in news"
                        :key="item._id"
                        :label="item.title"
                        :value="item._id"
                        >
                        </el-option>
                    </el-select> -->
                    <el-input v-model="formData.news.title" disabled width="300"></el-input>
                    <el-button type="text" @click="dialogTableVisible = true">选择新闻</el-button>
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
                    v-model="formData.sort"
                    :min="1"
                    :step="1">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="是否显示">
                    <el-switch
                        v-model="formData.status"
                        :active-value=1
                        :inactive-value=0
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
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
                img: '',
                title: '',
                news: '',
                sort: '',  //控制排序
                status: 1  //控制显示
            },
            news: [],
            dialogTableVisible: false,
            currentPage: 1,
            pageSize: 5,
            total: 0,
        };
    },
    components: {
        "upload-avatar": uploadAvatar
    },
    methods: {
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
        handleSubmit() {
            this.$axios.post('/admin/swiper', this.formData).then(res => {
                console.log(res)
                if(res.code == 200) {
                    this.$message.success(res.msg)
                    this.$router.push('/layout/swiper')
                } else if(res.code == 403) {
                    this.$message(res.msg)
                    this.$router.push('/')
                }
            })
        },
        handleSelect(_id) {
            this.$axios.get(`/admin/news/${_id}`).then(res => {
                if(res.code == 200) {
                    this.formData.news = {
                        ...res.data
                    }
                    this.dialogTableVisible = false
                } else if(res.code == 403) {
                    this.$message(res.msg)
                    this.$router.push('/')
                }
            })
        },
        handleCurrentChange(val) {
            console.log(val)
            this.currentPage = val
            this.getNews()
        }
    },
    created() {
        this.getNews()
    }
};
</script>

<style scoped lang="scss">
img {
    display: block;
    width: 100px;
    height: 100px;
}
</style>
