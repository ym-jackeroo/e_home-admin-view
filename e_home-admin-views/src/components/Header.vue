<template>
<div class="header">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/layout/home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-show="this.$route.path == '/layout/admin'||this.$route.path == '/layout/addAdmin'||this.$route.path == '/layout/adminDetail'">管理员管理</el-breadcrumb-item>
        <el-breadcrumb-item v-show="this.$route.path == '/layout/news'||this.$route.path == '/layout/addNews'||this.$route.path == '/layout/newsDetail'">新闻管理</el-breadcrumb-item>
        <el-breadcrumb-item v-show="this.$route.path == '/layout/swiper'||this.$route.path == '/layout/addSwiper'||this.$route.path == '/layout/swiperDetail'">轮播图管理</el-breadcrumb-item>
        <el-breadcrumb-item v-show="this.$route.path == '/layout/interaction'||this.$route.path == '/layout/addTopic'||this.$route.path == '/layout/commentList'">互动管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown class="dropdown">
        <div class="avatar">
            <img :src="this.$store.state.user.avatar" alt="">
        </div>
        <el-dropdown-menu slot="dropdown">
            <div @click="handlePerson">
                <el-dropdown-item>个人中心</el-dropdown-item>
            </div>
            <div @click="handleChange">
                <el-dropdown-item>修改密码</el-dropdown-item>
            </div>
            <div @click="handleLogout">
                <el-dropdown-item>退出登录</el-dropdown-item>
            </div>
        </el-dropdown-menu>
    </el-dropdown>
 </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    components: {

    },
    methods: {
        handlePerson() {
            this.$router.push({path:'/layout/person', query: {id: this.$store.state.user._id}})
        },
        handleChange() {
            this.$router.push('/layout/changePass')
        },
        handleLogout() {
            this.$axios.post('/admin/adminUser/logout').then(res => {
                console.log(res)
                if(res.code == 200) {
                    sessionStorage.clear()
                    this.$message.success(res.msg)
                    this.$router.push('/')
                } else if(res.code == 403) {
                    this.$message(res.msg)
                    this.$router.push('/')
                }
            })
        }
    },
    created() {
    }
}
</script>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    height: 50px;
    border: 1px solid #f1f1f1;
    box-sizing: border-box;
    padding: 0 16px;

    .breadcrumb {
        line-height: 50px;
    }

    .avatar {
        width: 48px;
        height: 48px;

        img {
            display: block;
            width: 48px;
            height: 48px;
            border-radius: 50%;
        }
    }
}
</style>
