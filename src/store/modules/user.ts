import { constantRoute } from '@/router/routes'
import { defineStore } from 'pinia'
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { userInfo, userLogin, userLogOut } from '@/api/user'
import { userInfoData, loginFormData, loginResponseData } from '@/api/user/type'
import type { userState } from './types/type'
// console.log(router, 'router')
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
