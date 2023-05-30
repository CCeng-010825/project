<template>
  <!-- <div></div> -->
  <template v-for="(item, index) in menuList" :key="item.path">
    <!-- {{ item }} -->
    <!-- 没有children的，没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item
        :index="item.path"
        v-if="!item.meta.hidden"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template v-slot:title>
          <span>
            {{ item.meta.title }}
          </span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有一个children的，有子路由且只有一个子路由 -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item
        :index="item.children[0].path"
        v-if="!item.children[0].hidden"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template v-slot:title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有多于1个子路由 -->
    <el-sub-menu
      :index="item.path"
      v-if="item.children && item.children.length > 1"
    >
      <template v-slot:title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menu-list="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script lang="ts">
export default {
  name: 'Menu',
}
</script>
<script setup lang="ts">
import { useRouter } from 'vue-router'
defineProps(['menuList'])
let $router = useRouter()
const goRoute = (vc: any) => {
  console.log(vc.index)
  $router.push(vc.index)
}
</script>

<style lang="scss" scoped></style>
