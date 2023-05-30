<template>
  <el-icon @click="change" style="margin-right: 10px">
    <component :is="flag ? 'Fold' : 'Expand'"></component>
  </el-icon>

  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>

  <!-- <el-button @click="showMatch">点击</el-button> -->
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
// import { ArrowRight } from '@element-plus/icons-vue'
import userStore from '@/store/modules/user'
import { reactive, toRefs, onBeforeMount, onMounted, ref } from 'vue'
// let useUserStore = userStore()
let flag = ref(false)
let $route = useRoute()
const change = () => {
  flag.value = !flag.value
}
// console.log($route.matched)
// console.log(useUserStore)
</script>
<style lang="scss" scoped></style>
