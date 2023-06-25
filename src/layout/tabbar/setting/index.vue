<template>
  <!-- <div class="setting-container"></div> -->
  <el-button size="small" icon="Refresh" circle @click="updateRefsh" />
  <el-button size="small" icon="FullScreen" circle @click="fullScreen" />
  <el-popover placement="bottom" title="主题设置" width="300" trigger="hover">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker
          @change="setColor"
          v-model="color"
          size="small"
          show-alpha
          :predefine="predefineColors"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          @change="changeDark"
          v-model="dark"
          class="mt-2"
          style="margin-left: 24px"
          inline-prompt
          active-icon="MoonNight"
          inactive-icon="Sunny"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button size="small" icon="Setting" circle />
    </template>
  </el-popover>
  <!-- <el-avatar
    icon="UserFilled"
    size="small"
    style="margin-left: 10px"
  ></el-avatar> -->
  <img
    :src="userStore.avatar"
    style="width: 24px; height: 24px; margin: 0px 10px; border-radius: 50%"
  />
  <el-dropdown style="margin-left: 10px">
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
let dark = ref<boolean>(false)
let layoutSettingStore = useLayoutSettingStore()
let userStore = useUserStore()
let $router = useRouter()
let $route = useRoute()
// const username = ref('')
const updateRefsh = () => {
  // console.log('ii')
  // console.log(layoutSettingStore.refresh)
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
const fullScreen = () => {
  // console.log('pp')
  // console.log(document.fullscreenElement)
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
const setColor = () => {
  // console.log('color')
  // console.log(document.documentElement)
  let html = document.documentElement
  // console.log(color.value)
  html.style.setProperty('--el-color-primary', color.value)
}
const changeDark = () => {
  // console.log('dark')
  let html = document.documentElement
  // console.log(dark.value)
  dark.value ? (html.className = 'dark') : (html.className = '')
}
const logout = async () => {
  // console.log('out')
  await userStore.reqLogout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>
<style lang="scss" scoped></style>
