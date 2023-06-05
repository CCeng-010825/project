<template>
  <div class="container">
    <div class="left" :class="layoutSettingStore.fold ? 'fold' : ''">
      <BreadCrumb></BreadCrumb>
    </div>
    <div class="right">
      <Setting></Setting>
    </div>
  </div>
</template>
<script setup lang="ts">
import BreadCrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
import useLayoutSettingStore from '@/store/modules/setting'
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
let layoutSettingStore = useLayoutSettingStore()
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  height: 100%;
  justify-content: space-between;
  .left {
    display: flex;
    margin-left: 20px;
    align-items: center;
  }
  .right {
    display: flex;
    align-items: center;
  }
}
</style>
