import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from './store/modules/user'
import pinia from './store'
import setting from './setting'
const userStore = useUserStore(pinia)
nprogress.configure({ showSpinner: false })
router.beforeEach(async (to: any, from: any, next: any) => {
  nprogress.start()
  document.title = `${setting.title}-${to.meta.title}`
  const username = userStore.username
  const token = userStore.token
  // console.log(username)
  // console.log(token)
  if (token) {
    // if()
    if (to.path === '/login') {
      next('/')
    } else {
      if (username) {
        next()
      } else {
        try {
          await userStore.reqUserInfo()
          next({ ...to })
        } catch (error) {
          await userStore.reqLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
  // next()
  // if (username) {
  //   next()
  // } else {
  // }
})

router.afterEach((to: any, from: any) => {
  nprogress.done()
})

/**
 * // console.log(to)
  document.title = `${setting.title}-${to.meta.title}`
  // console.log(userStore, 'userStore')
  nprogress.start()
  const token = userStore.token
  const username = userStore.username
  if (token) {
    // console.log('1111')
    if (to.path === '/login') {
      next({ path: '/' })
    }
    if (username) {
      next()
    } else {
      try {
        await userStore.reqUserInfo()
        next({ ...to })
      } catch (error) {
        // token过期或者手动修改token,用户退出登录，跳转到login页面
        await userStore.reqLogout()
        next({ path: '/login', query: { redirect: to.path } })
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
  // next()
 */
