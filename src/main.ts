import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
// @ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'virtual:svg-icons-register'
import gloablComponent from './components/index'
import router from './router/index'
import pinia from './store/index'
import axios from 'axios'
import './permission.ts'
const app = createApp(App)
axios({
  url: '/api/user/login',
  method: 'post',
  data: {
    username: 'admin',
    password: '111111',
  },
})

// app.use(axios)
app.use(router)
app.use(pinia)
app.use(gloablComponent)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
