import { constantRoute } from '@/router/routes'
import { defineStore } from 'pinia'
// console.log(router, 'router')
const userStore = defineStore('User', {
  state: () => {
    return {
      menuRoutes: constantRoute,
    }
  },
  actions: {},
  getters: {},
})
export default userStore
