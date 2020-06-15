import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
import TreeTable from 'vue-table-with-tree-grid'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import axios from 'axios'
// 配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)
Vue.use(VueQuillEditor)

Vue.filter('dateFormat', (val) => {
  let dt = new Date(val)
  let year = dt.getFullYear()
  let month = (dt.getMonth() + 1 + '').padStart(2, '0')
  let day = (dt.getDay() + 1 + '').padStart(2, '0')
  let hour = (dt.getHours() + '').padStart(2, '0')
  let min = (dt.getMinutes() + '').padStart(2, '0')
  let second = (dt.getSeconds() + '').padStart(2, '0')
  return `${year}-${month}-${day} ${hour}-${min}-${second}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
