<template>
  <div class="box">
    <div class="left">
      <div class="lbtn">
        <span @click="goHome">首页</span>
      </div>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据平台</div>
    </div>
    <div class="right">
      <div class="rbtn">
        <span>统计报告</span>
      </div>
      <div class="time">
        <span class="cTime">当前时间：{{ time }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'
let $router = useRouter()
let time = ref(moment().format('YYYY年MM月DD日 hh:mm:ss'))
let timer = ref(0)
onMounted(() => {
  timer.value = setInterval(() => {
    time.value = ref(moment().format('YYYY年MM月DD日 hh:mm:ss'))
  }, 1000)
  // console.log(timer.value)
})
onBeforeUnmount(() => {
  clearInterval(timer.value)
  // console.log(timer.value)
})
const goHome = () => {
  $router.push('/home')
}
</script>
<style lang="scss" scoped>
.box {
  height: 40px;
  width: 100%;
  display: flex;

  .left {
    flex: 1.5;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;

    .lbtn {
      width: 130px;
      height: 40px;

      display: flex;
      justify-content: center;
      align-items: center;

      background-size: 100% 100%;
      float: right;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      span {
        font-size: 20px;
        color: aqua;
      }
    }
  }
  .center {
    flex: 2;

    .title {
      width: 100%;
      background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
      background-size: 100% 100%;
      line-height: 74px;
      text-align: center;
      height: 74px;
      font-size: 30px;
      color: aqua;
    }
  }
  .right {
    flex: 1.5;

    background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .rbtn {
      height: 40px;
      width: 150px;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-size: 20px;
        color: aqua;
      }
    }
    .time {
      span {
        font-size: 16px;
        color: aqua;
      }
    }
  }
}
</style>
