<template>
    <div class="news">
        <el-card>
            <div slot="header">
                新闻列表
            </div>
            <el-table :data="allNews">
                <el-table-column label="新闻头图" prop="img" width="150px">
                    <template slot-scope="scope">
                        <img :src="scope.row.img">
                    </template>
                </el-table-column>
                <el-table-column label="新闻标题" prop="title" width="350px"></el-table-column>
                <el-table-column label="新闻作者" prop="author.nickname" width="150px"></el-table-column>
                <el-table-column label="分类" prop="type.title" width="150px"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleDetail(scope.row._id)">查看详细</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row._id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <div class="block">
            <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                allNews: [],
                currentPage: 1,
                pageSize: 10,
                total: 0
            };
        },
        components: {},
        methods: {
            getAllNews() {
                this.$axios.get('/admin/news', {page: this.currentPage, page_size: this.pageSize}).then(res => {
                    console.log(res)
                    if(res.code == 200) {
                        this.allNews = res.data
                        this.total = res.count
                    } else if(res.code == 403) {
                        this.$message(res.msg)
                        this.$router.push('/')
                    }
                })
            },
            handleDetail(id) {
                this.$router.push({path: '/layout/newsDetail', query: {id}})
            },
            handleDelete(id) {
                this.$confirm('此操作将永久删除该新闻, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.$axios.delete(`/admin/news/${id}`).then(res => {
                    console.log(res)
                    if(res.code = 200) {
                        this.$message.success(res.msg)
                        this.getAllNews()
                    } else if(res.code == 403) {
                        this.$message(res.msg)
                        this.$router.push('/')
                    }
                })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getAllNews()
            }
        },
        created() {
            this.getAllNews()
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
