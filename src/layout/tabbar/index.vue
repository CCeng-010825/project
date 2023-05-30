<template>
  <div class="container">
    <div class="left">
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
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
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
