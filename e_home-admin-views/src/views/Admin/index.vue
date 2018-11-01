<template>
<div class="admin">
    <el-card>
        <div slot="header">
            管理员列表
        </div>
        <el-table :data="tableData">
            <el-table-column label="头像" prop="avatar">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" class="table-item-img">
                </template>
            </el-table-column>
            <el-table-column label="姓名" prop="nickname"></el-table-column>
            <el-table-column label="手机号" prop="phone"></el-table-column>
            <el-table-column label="个性签名" prop="desc"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleDetail(scope.row._id)">查看详细</el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(scope.row._id)">删除</el-button>
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
    </el-card>
 </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            total: 0,
            currentPage: 1,
            pageSize: 10
        }
    },
    components: {

    },
    methods: {
        getTableData() {
            this.$axios.get('/admin/adminUser', {page: this.currentPage, page_size: this.pageSize}).then(res => {
                console.log(res)
                if(res.code == 200) {
                    this.tableData = res.data
                    this.total = res.count
                } else if(res.code == 403) {
                    this.$message(res.msg)
                    this.$router.push('/')
                }
            })
        },
        handleCurrentChange(val) {
            console.log(val)
            this.currentPage = val
            this.getTableData()
        },
        handleDetail(id) {
            this.$router.push({path:'/layout/adminDetail', query: {id}})
        },
        handleDelete(_id) {
            this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            this.$axios.delete(`/admin/adminUser/${_id}`).then(res => {
                console.log(res)
                if(res.code == 200) {
                    this.$message.success(res.msg)
                    this.getTableData()
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
        this.getTableData()
    }
}
</script>

<style scoped lang="scss">
</style>
