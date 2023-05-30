<template>
  <div class="layout_container">
    <div class="layout_slider">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          :default-active="$route.path"
          background-color="#001529"
          text-color="white"
          active-text-color="yellowgreen"
        >
          <Menu :menu-list="useUserStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar">
      <Tabbar></Tabbar>
    </div>
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout',
}
</script>
<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import { useRouter } from 'vue-router'
import userStore from '@/store/modules/user.ts'
import { ref } from 'vue'
// import useStore from 'element-plus/es/components/table/src/store/index.js'
// console.log(useRouter)
// console.log($route.path)
let useUserStore = userStore()
// console.log(useUserStore)
</script>

<style scoped lang="scss">
.layout_container {
  width: 100vw;
  height: 100vh;
  .layout_slider {
    color: white;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
    }
    .el-menu {
      border-right: none;
    }
  }
  .layout_tabbar {
    position: fixed;
    top: 0;
    width: calc(100% - $base-menu-width);
    left: $base-menu-width;
    height: $base-tabbar-height;
    background-color: white;
    transition: all 0.3s;
  }
  .layout_main {
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    background-color: yellow;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
  }
}
</style>
