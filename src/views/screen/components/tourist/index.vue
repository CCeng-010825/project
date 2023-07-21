<template>
  <div class="box3">
    <div class="title">
      <p>实时游客统计</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index" class="text">
        {{ item }}
      </span>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>
<script setup lang="ts">
import 'echarts-liquidfill'
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
let charts = ref()
let people = ref('123789人')
onMounted(() => {
  let myChart = echarts.init(charts.value)
  let option = {
    //标题组件
    title: {
      text: '水球图',
    },
    //x|y轴组件
    xAxis: {},
    yAxis: {},
    //系列:决定你展示什么样的图形图标
    series: {
      type: 'liquidFill', //系列
      data: [0.6, 0.4, 0.2], //展示的数据
      waveAnimation: true, //动画
      animationDuration: 3,
      animationDurationUpdate: 0,
      radius: '100%', //半径
      outline: {
        //外层边框颜色设置
        show: true,
        borderDistance: 8,
        itemStyle: {
          color: 'skyblue',
          borderColor: '#294D99',
          borderWidth: 8,
          shadowBlur: 20,
          shadowColor: 'rgba(0, 0, 0, 0.25)',
        },
      },
    },
    //布局组件
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  }
  myChart.setOption(option)
})
</script>
<style lang="scss" scoped>
.box3 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  .title {
    margin-left: 20px;
    color: white;
  }
  .number {
    padding: 10px;
    margin-top: 10px;
    display: flex;
    .text {
      flex: 1;
      text-align: center;
      height: 20px;
      line-height: 20px;
      color: #29fcff;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .charts {
    height: 270px;
  }
}
</style>
