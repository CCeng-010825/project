<template>
  <div class="layout_container">
    <div class="layout_slider">
      <Logo></Logo>
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
  }
}
</style>
