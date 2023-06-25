import type { RouteRecordRaw } from 'vue-router'

export interface userState {
  token: string | null
  avatar: string
  username: string
  buttons: string[]
  menuRoutes: RouteRecordRaw[]
}
