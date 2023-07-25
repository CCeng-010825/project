import { constantRoute, asyncRoutes, anyRoutes } from '@/router/routes'
import { defineStore } from 'pinia'
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { userInfo, userLogin, userLogOut } from '@/api/user'
import { userInfoData, loginFormData, loginResponseData } from '@/api/user/type'
import type { userState } from './types/type'
import router from '@/router'
//@ts-expect-error
import cloneDeep from 'lodash/cloneDeep'
// console.log(router, 'router')
function filterAsyncRoute(asyncRoutes: any, route: any) {
  return asyncRoutes.filter((item: any) => {
    if (route.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, route)
      }
      return true
    }
  })
}

const useUserStore = defineStore('User', {
  state: (): userState => {
    return {
      menuRoutes: constantRoute,
      token: GET_TOKEN(),
      avatar: '',
      username: '',
      buttons: [],
    }
  },
  actions: {
    async reqLogin(data: loginFormData) {
      const result: loginResponseData = await userLogin(data)
      if (result.code === 200) {
        this.token = result.data as string
        SET_TOKEN(result.data as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    async reqUserInfo() {
      const result: userInfoData = await userInfo()
      // console.log(result)
      if (result.code === 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        this.buttons = result.data.buttons
        const userasyncRoute = filterAsyncRoute(
          // JSON.stringify(JSON.parse(asyncRoutes))
          cloneDeep(asyncRoutes),
          result.data.routes,
        )
        this.menuRoutes = [...constantRoute, ...userasyncRoute, anyRoutes]
        console.log(this.menuRoutes)
        // router.addRoute([...asyncRoute])
        ;[...userasyncRoute, anyRoutes].forEach((item: any) => {
          router.addRoute(item)
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async reqLogout() {
      const result: any = await userLogOut()
      if (result.code === 200) {
        this.username = ''
        this.avatar = ''
        this.token = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
export default useUserStore
