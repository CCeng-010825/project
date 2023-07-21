<template>
  <el-icon @click="change" style="margin-right: 10px">
    <component :is="layoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>

  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon>
        <component :is="item.meta.icon" v-if="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>

  <!-- <el-button @click="showMatch">点击</el-button> -->
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import useLayoutSettingStore from '@/store/modules/setting'
import { reactive, toRefs, onBeforeMount, onMounted, ref } from 'vue'
// let useUserStore = userStore()
// let flag = ref(false)?
let layoutSettingStore = useLayoutSettingStore()
let $route = useRoute()
const change = () => {
  // flag.value = !flag.value
  // console.log(layoutSettingStore)
  layoutSettingStore.fold = !layoutSettingStore.fold
}
// console.log($route.matched)
// console.log(useUserStore)
</script>
<style lang="scss" scoped></style>
