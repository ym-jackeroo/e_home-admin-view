<template>
<div class="side-bar">
    <el-menu
      default-active="/layout/home"
      class="el-menu-demo"
      background-color="#304156"
      text-color="#fff"
      :router=true
      active-text-color="#409eff">
        <el-menu-item index="/layout/home">
            首页
        </el-menu-item>
        <el-submenu index="admin">
            <div slot="title">
                管理员管理
            </div>
            <el-menu-item index="/layout/admin">
                管理员列表
            </el-menu-item>
            <el-menu-item index="/layout/addAdmin">
                添加管理员
            </el-menu-item>
        </el-submenu>
        <el-submenu index="news">
            <div slot="title">
                新闻管理
            </div>
            <el-menu-item index="/layout/news">
                新闻列表
            </el-menu-item>
            <el-menu-item index="/layout/addNews">
                添加新闻
            </el-menu-item>
        </el-submenu>
        <el-submenu index="swiper">
            <div slot="title">
                轮播图管理
            </div>
            <el-menu-item index="/layout/swiper">
                轮播图列表
            </el-menu-item>
            <el-menu-item index="/layout/addSwiper">
                添加轮播图
            </el-menu-item>
        </el-submenu>
        <el-submenu index="iteraction">
            <div slot="title">
                互动管理
            </div>
            <el-menu-item index="/layout/interaction">
                互动列表
            </el-menu-item>
        </el-submenu>
    </el-menu>
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
        
    }
}
</script>

<style scoped lang="scss">
.side-bar {
    min-height: 100vh;
    border-right: 1px solid #f1f1f1;
    background: #304156;

    /deep/ {
        .el-menu {
            border: none;
        }
    }

    a {
        display: block;
        width: 100%;
        height: 100%;
        color: #fff;
    }

    .el-submenu .el-menu-item {
        min-width: 0;
    }
}
</style>
