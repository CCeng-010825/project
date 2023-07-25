<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="header">
        <Top></Top>
      </div>
      <div class="main">
        <div class="left">
          <Tourist class="tourist"></Tourist>
          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <div class="center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="right">
          <Rank class="rank"></Rank>
          <Year class="year"></Year>
          <Counter class="counter"></Counter>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Top from './components/top/index.vue'
//引入左侧三个子组件
import Tourist from './components/tourist/index.vue'
import Sex from './components/sex/index.vue'
import Age from './components/age/index.vue'

//引入中间两个子组件
import Map from './components/map/index.vue'
import Line from './components/line/index.vue'

//引入右侧三个子组件
import Rank from './components/rank/index.vue'
import Year from './components/year/index.vue'
import Counter from './components/couter/index.vue'
import { ref, onMounted } from 'vue'
let screen = ref()
onMounted(() => {
  // console.log(screen.value.style.transform)
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
  // ww<wh，即宽度变窄或者高度变高，宽度变窄，上下有空白，此时赢选择ww的值    ww>wh宽度变宽或者高度变低，此时左右有空白
}
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
  // console.log('resize')
}
</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: url('./images/bg.png') no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    .header {
      width: 100%;
      height: 40px;
    }
    .main {
      display: flex;
      .left {
        flex: 1;
        display: flex;
        height: 1040px;
        flex-direction: column;
        .tourist {
          flex: 1.2;
        }
        .sex {
          flex: 1;
        }
        .age {
          flex: 1;
        }
      }
      .center {
        flex: 1.5;
        display: flex;
        flex-direction: column;
        .map {
          flex: 4;
        }
        .line {
          flex: 1;
        }
      }
      .right {
        flex: 1;
        display: flex;
        margin-left: 40px;
        flex-direction: column;
        .rank {
          flex: 1.5;
        }
        .year {
          flex: 1;
        }
        .counter {
          flex: 1;
        }
      }
    }
  }
}
</style>
