<template>
  <div>
    <el-card style="height: 80px">
      <div>
        <el-form :inline="true" class="container">
          <el-form-item label="用户名：">
            <el-input placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary">重置</el-button>
            <el-button size="small" type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card style="margin: 10px 0px">
      <el-button size="small" type="primary">添加用户</el-button>
      <el-button size="small" type="primary">批量删除</el-button>
      <el-table>
        <el-table-column type="select"></el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="用户名字"></el-table-column>
        <el-table-column label="用户名称"></el-table-column>
        <el-table-column label="用户角色"></el-table-column>
        <el-table-column label="创建时间"></el-table-column>
        <el-table-column label="更新时间"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
