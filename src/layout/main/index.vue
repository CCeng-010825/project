<template>
  <div></div>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag"></component>
    </transition>
  </router-view>
</template>
<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
let flag = ref(true)
let layoutSettingStore = useLayoutSettingStore()
watch(
  () => layoutSettingStore.refresh,
  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>
<script lang="ts">
export default {
  name: 'Main',
}
</script>
<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-enter-to {
  opacity: 1;
  // rotate: 360deg;
  transform: scale(1);
}
</style>
