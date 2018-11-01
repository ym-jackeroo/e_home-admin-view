<template>
    <div class="layout">
        <el-row>
            <el-col :span="4">
                <SideBar class="sidebar"></SideBar>
            </el-col>
            <el-col :span="20" class="right">
                <Header class="header"></Header>
                <AppMain class="appmain"></AppMain>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Header from '@/components/Header'
import SideBar from '@/components/SideBar'
import AppMain from './AppMain'
export default {
    data() {
        return {};
    },
    components: {
        Header,
        SideBar,
        AppMain
    }
};
</script>

<style scoped lang="scss">
.right {
    height: 100vh;
    overflow: auto;
}

.header {
    position: fixed;
    top: 0;
    right: 0;
    left: 227.66px;
    background: #fff;
    z-index: 998;
}

.appmain {
    margin-top: 50px;
}
</style>
