import type { RouteRecordRaw } from 'vue-router'
import { categoryObj } from '@/api/product/attr/type'
export interface userState {
  token: string | null
  avatar: string
  username: string
  buttons: string[]
  menuRoutes: RouteRecordRaw[]
}
export interface categoryState {
  c1Arr: categoryObj[]
  c1Id: string | number
  c2Id: string | number
  c2Arr: categoryObj[]
  c3Id: string | number
  c3Arr: categoryObj[]
}
