<script setup lang="ts"></script>

<template>
  <div>
    <Suspense>
      <router-view></router-view>
      <template #fallback>加载中...</template>
    </Suspense>
  </div>
  <!-- <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition mode="out-in">
        <KeepAlive>
          <Suspense>
            
            <component :is="Component"></component>
            
            <template #fallback>正在加载...</template>
          </Suspense>
        </KeepAlive>
      </Transition>
    </template>
  </RouterView> -->
</template>

<style scoped></style>
