<!-- 封装三级联动组件 -->
<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryStore.c1Id"
          @change="getC2Arr"
          :disabled="props.scene === 0 ? false : true"
        >
          <el-option
            v-for="(c1, index) in categoryStore.c1Arr"
            :value="c1.id"
            :label="c1.name"
            :key="c1.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="categoryStore.c2Id"
          @change="getC3Arr"
          :disabled="props.scene === 0 ? false : true"
        >
          <el-option
            v-for="(c2, index) in categoryStore.c2Arr"
            :value="c2.id"
            :label="c2.name"
            :key="c2.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="categoryStore.c3Id"
          :disabled="props.scene === 0 ? false : true"
        >
          <el-option
            v-for="(c3, index) in categoryStore.c3Arr"
            :value="c3.id"
            :label="c3.name"
            :key="c3.name"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import useCategoryStore from '@/store/modules/category'
// let value = ref('')
let props = defineProps(['scene'])
let categoryStore = useCategoryStore()
const getC1Arr = () => {
  categoryStore.getC1Arr()
}
const getC2Arr = () => {
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
  categoryStore.c3Arr = []
  categoryStore.getC2Arr()
}
const getC3Arr = () => {
  categoryStore.c3Id = ''
  categoryStore.getC3Arr()
}
onMounted(() => {
  getC1Arr()
})
</script>
<style lang="scss" scoped></style>
