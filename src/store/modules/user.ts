import { constantRoute } from '@/router/routes'
import { defineStore } from 'pinia'
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// console.log(router, 'router')
const userStore = defineStore('User', {
  state: () => {
    return {
      menuRoutes: constantRoute,
      token: GET_TOKEN(),
    }
  },
  actions: {},
  getters: {},
})
export default userStore
