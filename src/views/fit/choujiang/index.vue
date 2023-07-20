<template>
  <div class="outher">
    <div class="wapper">
      <div class="left">
        <!-- 一边4个选项 -->
        <div class="one"><span class="text"></span></div>
        <div class="two"><span class="text"></span></div>
        <div class="three"><span class="text"></span></div>
        <div class="four"><span class="text"></span></div>
      </div>
      <div class="right">
        <div class="one"><span class="text"></span></div>
        <div class="two"><span class="text"></span></div>
        <div class="three"><span class="text"></span></div>
        <div class="four"><span class="text"></span></div>
      </div>
    </div>
    <!-- 图形中间的文字 -->
    <div class="circle" @click="start">抽奖</div>
  </div>
</template>
<script setup lang="ts">
import { reactive, toRefs, onBeforeMount, onMounted, ref } from 'vue'
let wapper = document.querySelector('.wapper')

let textAll = document.querySelectorAll('.wapper .text')
console.log(textAll)

// 这里是奖项的名字
let prize = ref<any>([
  '1号大奖',
  '2号大奖',
  '3号大奖',
  '4号大奖',
  '5号大奖',
  '6号大奖',
  '7号大奖',
  '未中奖',
])

// 权重数组 不同奖项的权重值，权重越高越容易中这个区域
let prizeWeight = ref<any>([1, 3, 5, 7, 10, 15, 20, 30])

//  权重之和
let weightSum = prizeWeight.value.reduce(function (prevValue, curVal) {
  return prevValue + curVal
})
for (let i = 0; i < textAll.length; i++) {
  textAll[i].innerHTML = prize.value[i]
}

let isFlag = true

const start = () => {
  console.log(123)
  if (isFlag) {
    // 生成权重随机数 生成数的范围是【1,30】
    // 这里需要注意的是，这个30要和最上面的prizeWeight的最后一个值对应
    let weightRandom = parseInt((Math.random() * 30) as number)
    // 合并
    let concatAfterArr = prizeWeight.value.concat(weightRandom)

    // 排序
    let sortedWeightArr = concatAfterArr.sort(function (a, b) {
      return a - b
    })

    // randomIndex是奖项的索引 结果是【1,7】
    let randomIndex = sortedWeightArr.indexOf(weightRandom)
    randomIndex = Math.min(randomIndex, prize.value.length - 1)

    // 获奖的内容
    let text = prize[randomIndex]

    switch (randomIndex) {
      case 0:
        run(22.5, text)
        break
      case 1:
        run(66.5, text)
        break
      case 2:
        run(112.5, text)
        break
      case 3:
        run(157.5, text)
        break
      case 4:
        run(338.5, text)
        break
      case 5:
        run(294.5, text)
        break
      case 6:
        run(247.5, text)
        break
      case 7:
        run(201.5, text)
        break
    }
  }
}

function run(angle, text) {
  isFlag = false
  let begin = 0
  let timer = null
  let basic = 1800
  timer = setInterval(function () {
    if (begin > basic + angle) {
      isFlag = true
      clearInterval(timer)
    }
    wapper.style.transform = 'rotate(' + begin + 'deg)'
    // 这是一个算法 可以出现转盘又很快到慢慢变慢的效果
    begin += Math.ceil(basic + angle - begin) * 0.1
  }, 70)
}
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

body {
  /* 让div盒子放到屏幕中间 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.outher {
  width: 300px;
  height: 300px;
  position: relative;
  border-radius: 50%;
}

.wapper {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  background-color: black;
  transform: rotate(22.5deg);
}

.left {
  position: absolute;
  width: 150px;
  height: 300px;
  left: 0;
  overflow: hidden;
}

.left .text {
  position: absolute;
  top: 30px;
  left: 55%;
  transform: rotate(-22.5deg);
  text-align: center;
}

.right .text {
  position: absolute;
  top: 25px;
  left: 11%;
  transform: rotate(22.5deg);
  text-align: center;
}
.right {
  position: absolute;
  width: 150px;
  height: 300px;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.left div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-origin: right center;
}

.left div.one {
  background-color: #fc7c7b;
}
.left div.two {
  background-color: #f59462;
  transform: rotate(-45deg);
}

.left div.three {
  background-color: #fc7c7b;
  transform: rotate(-90deg);
}

.left div.four {
  background-color: #f59462;
  transform: rotate(-135deg);
}
.right div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-origin: left center;
}
.right div.one {
  background-color: #fc7c7b;
}
.right div.two {
  background-color: #f59462;
  transform: rotate(45deg);
}

.right div.three {
  background-color: #fc7c7b;
  transform: rotate(90deg);
}

.right div.four {
  background-color: #fff;
  transform: rotate(135deg);
}

.circle {
  width: 100px;
  height: 100px;
  background-color: #f2552e;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
}

.circle:after {
  width: 0;
  height: 0;
  border: 40px solid #f2552e;
  border-left-width: 10px;
  border-right-width: 10px;
  position: absolute;
  content: '';
  border-left-color: transparent;
  border-top-color: transparent;
  border-right-color: transparent;
  top: -70px;
  left: calc(50% - 10px);
  z-index: -1;
}
</style>
