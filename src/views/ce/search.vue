<template>
  <div>
    <div style="margin-top: 50px">
      <el-input
        v-model="name"
        style="width: 300px"
        placeholder="请输入用户名"
      ></el-input>
      <el-button type="primary" @click="search">查询</el-button>
    </div>

    <div>
      <el-table border strip :data="historyInfos">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="startTime" label="提交时间"></el-table-column>
        <el-table-column prop="endTime" label="审批时间"></el-table-column>
        <el-table-column prop="reason" label="事由"></el-table-column>
        <el-table-column prop="days" label="天数"></el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.status">已通过</el-tag>
            <el-tag type="danger" v-else>已拒绝</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
// import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import axios from 'axios'
export default {
  data() {
    return {
      historyInfos: [],
      name: 'zhangsan',
    }
  },
  methods: {
    search() {
      let _this = this
      axios
        .get('/vacation/search?name=' + this.name)
        .then(function (response) {
          if (response.data.status == 200) {
            _this.historyInfos = response.data.data
          } else {
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
