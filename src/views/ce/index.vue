<template>
  <div>
    <div>请选择你的身份：</div>
    <div>
      <el-select name="" id="" v-model="identity" @change="initTasks">
        <el-option
          :value="iden"
          v-for="(iden, index) in identities"
          :key="index"
          :label="iden"
        ></el-option>
      </el-select>
      <el-button type="primary" @click="initTasks">刷新一下</el-button>
    </div>
  </div>
  <el-table border strip :data="tasks">
    <el-table-column prop="name" label="姓名"></el-table-column>
    <el-table-column prop="days" label="请假天数"></el-table-column>
    <el-table-column prop="reason" label="请假原因"></el-table-column>
    <el-table-column lable="操作">
      <template #default="scope">
        <el-button
          type="primary"
          @click="approveOrReject(scope.row.id, true, scope.row.name)"
        >
          批准
        </el-button>
        <el-button
          type="danger"
          @click="approveOrReject(scope.row.id, false, scope.row.name)"
        >
          拒绝
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
// import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import axios from 'axios'
export default {
  data() {
    return {
      tasks: [],
      identities: ['managers'],
      identity: '',
    }
  },
  methods: {
    initTasks() {
      let _this = this
      axios
        .get('/vacation/list?identity=' + this.identity)
        .then(function (response) {
          _this.tasks = response.data.data
        })
        .catch(function (error) {
          console.log(error)
        })
      // axios({
      //   url: '172.16.69.60:8080/vacation/list?identity=managers',
      //   method: 'get',
      // }).then((res) => {
      //   console.log(res)
      // })
    },
    approveOrReject(taskId, approve, name) {
      let _this = this
      axios
        .post('/vacation/handler', {
          taskId: taskId,
          approve: approve,
          name: name,
        })
        .then(function (response) {
          _this.initTasks()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  },
}
</script>
<style lang="scss" scoped></style>
