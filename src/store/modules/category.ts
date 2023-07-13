// 将一二三级联动数据存储在pinia仓库中
import { defineStore } from 'pinia'
import { AttrResponseData } from '@/api/product/attr/type'
import { getC1, getC2, getC3 } from '@/api/product/attr'
import { categoryState } from './types/type'

const useCategoryStore = defineStore('category', {
  state: (): categoryState => {
    return {
      c1Id: '',
      c1Arr: [],
      c2Id: '',
      c2Arr: [],
      c3Id: '',
      c3Arr: [],
    }
  },
  actions: {
    async getC1Arr() {
      const result: AttrResponseData = await getC1()
      this.c1Arr = result.data
    },
    async getC2Arr() {
      const result: AttrResponseData = await getC2(this.c1Id)
      this.c2Arr = result.data
    },
    async getC3Arr() {
      const result: AttrResponseData = await getC3(this.c2Id)
      this.c3Arr = result.data
    },
  },
  getters: {},
})
export default useCategoryStore
