// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css/normalize.css' //引入初始化样式
import service from './utils/request'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style/index.scss'
import VueQuillEditor from 'vue-quill-editor' //富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Vuex from 'vuex'
import store from './Store/index'

Vue.use(Vuex)

Vue.use(VueQuillEditor, /* { default global options } */)

Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.prototype.$axios = service
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
