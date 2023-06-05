import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

nprogress.configure({ showSpinner: false })
router.beforeEach((to: any, from: any, next: any) => {
  nprogress.start()
  next()
})

router.afterEach((to: any, from: any) => {
  nprogress.done()
})
