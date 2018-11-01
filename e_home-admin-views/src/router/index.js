import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/Login')
    },
    {
      path: '/layout',
      component: Layout,
      redirect: '/layout/home',
      children: [
        {
          path: 'home',
          meta: {
            title: '首页'
          },
          component: () => import('@/views/Home')
        },
        {
          path: 'admin',
          meta: {
            title: '管理员列表'
          },
          component: () => import('@/views/Admin/index')
        },
        {
          path: 'addAdmin',
          meta: {
            title: '添加管理员'
          },
          component: () => import('@/views/Admin/AddAdmin')
        },
        {
          path: 'adminDetail',
          meta: {
            title: '管理员详情'
          },
          component: () => import('@/views/Admin/AdminDetail')
        },
        {
          path: 'person',
          meta: {
            title: '个人中心'
          },
          component: () => import('@/views/Admin/AdminDetail')
        },
        {
          path: 'changePass',
          meta: {
            title: '修改密码'
          },
          component: () => import('@/views/Admin/ChangePass')
        },
        {
          path: 'news',
          meta: {
            title: '新闻列表'
          },
          component: () => import('@/views/News/index')
        },
        {
          path: 'addNews',
          meta: {
            title: '添加新闻'
          },
          component: () => import('@/views/News/AddNews')
        },
        {
          path: 'newsDetail',
          meta: {
            title: '新闻详情'
          },
          component: () => import('@/views/News/NewsDetail')
        },
        {
          path: 'swiper',
          meta: {
            title: '轮播图列表'
          },
          component: () => import('@/views/Swiper/index')
        },
        {
          path: 'addSwiper',
          meta: {
            title: '添加轮播图'
          },
          component: () => import('@/views/Swiper/AddSwiper')
        },
        {
          path: 'swiperDetail',
          meta: {
            title: '轮播图详情'
          },
          component: () => import('@/views/Swiper/SwiperDetail')
        },
        {
          path: 'interaction',
          meta: {
            title: '互动列表'
          },
          component: () => import('@/views/Interaction/index')
        },
        {
          path: 'commentList',
          meta: {
            title: '评论列表'
          },
          component: () => import('@/views/Interaction/CommentList')
        }
      ]
    }
  ]
})
