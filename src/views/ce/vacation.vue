<template>
  <div>
    <h1>开始一个请假流程</h1>
    <table>
      <tr>
        <td>请输入姓名：</td>
        <td>
          <el-input type="text" v-model="afl.name" />
        </td>
      </tr>
      <tr>
        <td>请输入请假天数：</td>
        <td>
          <el-input type="text" v-model="afl.days" />
        </td>
      </tr>
      <tr>
        <td>请输入请假理由：</td>
        <td>
          <el-input type="text" v-model="afl.reason" />
        </td>
      </tr>
    </table>
    <el-button type="primary" @click="submit">提交请假申请</el-button>
  </div>
</template>
<script>
// import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import axios from 'axios'
export default {
  data() {
    return {
      afl: {
        name: 'test',
        days: 3,
        reason: '测试',
      },
    }
  },
  methods: {
    submit() {
      let _this = this
      axios
        .post('/vacation', this.afl)
        .then(function (response) {
          if (response.data.status == 200) {
            //提交成功
            _this.$message.success(response.data.msg)
          } else {
            //提交失败
            _this.$message.error(response.data.msg)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  },
}
</script>
<style lang="scss" scoped></style>
