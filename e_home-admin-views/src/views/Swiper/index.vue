<template>
    <div class="swiper">
        <el-card>
            <div slot="header">
                {{this.$route.meta.title}}
            </div>
            <el-table :data="swiperData">
                <el-table-column label="轮播图" prop="img" width="150px">
                    <template slot-scope="scope">
                        <img :src="scope.row.img">
                    </template>
                </el-table-column>
                <el-table-column label="轮播图标题" prop="title"></el-table-column>
                <el-table-column label="轮播图新闻" prop="news.title"></el-table-column>
                <el-table-column label="排序" prop="sort" width="100px"></el-table-column>
                <el-table-column label="是否显示" prop="status" width="100px"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleDetail(scope.row._id)">查看详情</el-button>
                        <el-button type="danger" size="mini" @click="handleRemove(scope.row._id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            swiperData: []
        };
    },
    components: {},
    methods: {
        getSwiperData() {
            this.$axios.get('/admin/swiper').then(res => {
                console.log(res)
                if(res.code == 200) {
                    this.swiperData = res.data
                } else if(res.code == 403) {
                    this.$message(res.msg)
                    this.$router.push('/')
                }
            })
        },
        handleDetail(id) {
            this.$router.push({path: '/layout/swiperDetail', query: {id}})
        },
        handleRemove(id) {
            this.$confirm('此操作将永久删除该轮播图, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            this.$axios.delete(`/admin/swiper/${id}`).then(res => {
                if(res.code == 200) {
                    this.$message.success(res.msg)
                    this.getSwiperData()
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
        }
    },
    created() {
        this.getSwiperData()
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
