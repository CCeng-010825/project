import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
// @ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'virtual:svg-icons-register'
import gloablComponent from './components/index'
import router from './router/index'
import pinia from './store/index'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(gloablComponent)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
