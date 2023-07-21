<template>
  <div class="box1">
    <div class="title">
      <p>男女比例</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="sex">
      <div class="man">
        <img src="../../images/man.png" alt="" />
      </div>
      <div class="women">
        <img src="../../images/woman.png" alt="" />
      </div>
    </div>
    <div class="rate">
      <p>男士48%</p>
      <p>女士52%</p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
let charts = ref()
onMounted(() => {
  let myChart = echarts.init(charts.value)
  let option = {
    title: {
      text: '男女比例',
      textStyle: {
        //主标题颜色
        color: 'skyblue',
      },
      left: '40%',
    },

    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    xAxis: {
      //   type: 'value',
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      type: 'category',
      show: false,
    },
    series: [
      {
        type: 'bar',
        // stack: 'Total',
        barWidth: 20,
        z: 100,
        // label: {
        //   show: true,
        // },
        itemStyle: {
          color: 'skyblue',
          borderRadius: 20,
        },
        data: [58],
      },
      {
        type: 'bar',
        // stack: 'Total',
        barGap: '-100%',
        barWidth: 20,
        itemStyle: {
          color: 'pink',
          borderRadius: 20,
        },
        data: [100],
      },
    ],
  }
  myChart.setOption(option)
})
</script>
<style lang="scss" scoped>
.box1 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0px;
  .title {
    margin-left: 20px;
    p {
      font-size: 20px;
      color: white;
    }
  }
  .sex {
    display: flex;
    justify-content: center;
    .man {
      margin: 20px;
      width: 111px;
      height: 115px;
      background: url(../../images/man-bg.png) no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .women {
      margin: 20px;
      width: 111px;
      height: 115px;
      background: url(../../images/woman-bg.png) no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .rate {
    display: flex;
    justify-content: space-between;
    p {
      color: white;
    }
  }
  .charts {
    height: 100px;
  }
}
</style>
