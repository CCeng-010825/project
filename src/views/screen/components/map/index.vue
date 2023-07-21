<template>
  <div class="box4" ref="map">
    我是map
    <!-- <div class="echart" ref="map"></div> -->
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import chinaJson from './china.json'
let map = ref()
echarts.registerMap('china', chinaJson as any)
onMounted(() => {
  let myChart = echarts.init(map.value)
  let option = {
    geo: {
      map: 'china',
      roam: true,
      left: 150,
      top: 150,
      right: 150,
      zoom: 1.2,
      bottom: 0,
      //地图上的文字的设置
      label: {
        show: true, //文字显示出来
        color: 'white',
        fontSize: 14,
      },
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'red',
            },
            {
              offset: 1,
              color: 'blue',
            },
          ],
          global: false,
        },
        opacity: 0.8,
      },
      emphasis: {
        itemStyle: {
          color: 'red',
        },
        label: {
          fontSize: 40,
        },
      },
    },
    // 布局位置
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    series: [
      // 航线系列
      {
        type: 'lines',
        data: [
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [119.306239, 26.075302], // 终点
            ],
            lineStyle: {
              color: 'orange',
              width: 5,
            },
          },
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [114.298572, 30.584355], // 终点
            ],
            lineStyle: {
              color: 'yellow',
              width: 5,
            },
          },
        ],
        effect: {
          show: true,
          symbol: 'arrow',
          color: 'black',
          symbolSize: 10,
        },
      },
    ],
    // series: [
    //   {
    //     type: 'lines', //航线的系列
    //     data: [
    //       {
    //         coords: [
    //           [116.405285, 39.904989], // 起点
    //           [119.306239, 26.075302], // 终点
    //         ],
    //         // 统一的样式设置
    //         lineStyle: {
    //           color: 'orange',
    //           width: 5,
    //         },
    //       },
    //       {
    //         coords: [
    //           [116.405285, 39.904989], // 起点
    //           [114.298572, 30.584355], // 终点
    //         ],
    //         // 统一的样式设置
    //         lineStyle: {
    //           color: 'yellow',
    //           width: 5,
    //         },
    //       },
    //     ],
    //     //开启动画特效
    //     effect: {
    //       show: true,
    //       symbol: 'arrow',
    //       color: 'black',
    //       symbolSize: 10,
    //     },
    //   },
    // ],
  }
  myChart.setOption(option)
})
</script>
<style lang="scss" scoped></style>
