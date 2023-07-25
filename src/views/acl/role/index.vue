<template>
  <div>
    <el-card style="height: 80px">
      <el-form
        :inline="true"
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <el-form-item label="职位搜索">
          <el-input
            v-model="roleValue"
            placeholder="请你输入搜索职位关键字"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default">查询</el-button>
          <el-button type="primary" size="default">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0px">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        v-hhh="`btn.Role.add`"
      >
        添加职位
      </el-button>
      <el-table :data="tableData" border style="margin: 10px 0px">
        <el-table-column
          label="#"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="ID" align="center" prop="id"></el-table-column>
        <el-table-column
          label="职位名称"
          align="center"
          prop="roleName"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          prop="updateTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="setMenu(row)"
            >
              分配权限
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateMenu(row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`你确定要删除${row.roleName}?`"
              width="260px"
              @confirm="deleteMenu(row.id)"
            >
              <template #reference>
                <el-button type="primary" size="small" icon="Delete">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :pager-count="7"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="getData"
      ></el-pagination>
      <el-drawer v-model="drawer" @close="close">
        <template #header>
          <h4>分配菜单与按钮的权限</h4>
        </template>
        <template #default>
          <el-tree
            ref="treeRef"
            :data="treeData"
            show-checkbox
            default-expand-all
            node-key="id"
            :default-checked-keys="selectArr"
            highlight-current
            :props="defaultProps"
          />
        </template>
        <template #footer>
          <el-button type="primary" size="default" @click="save">
            保存
          </el-button>
          <el-button type="" size="default">取消</el-button>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import {
  reqRemoveRole,
  reqAllRoleList,
  reqAddOrUpdateRole,
  reqAllMenuList,
  reqSetPermisstion,
} from '@/api/acl/role'
import { ElMessage } from 'element-plus'
import { ref, onMounted, reactive } from 'vue'
let roleValue = ref<string>('')
let tableData = ref<any>([])
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)
let drawer = ref<boolean>(false)
let treeData = ref<any>([])
let selectArr = ref<any>([])
let treeRef = ref<any>()
let defaultProps = ref<any>({
  children: 'children',
  label: 'name',
})
let roleParams = reactive<any>({
  id: 0,
})
const getData = async (pager = 1) => {
  pageNo.value = pager
  let result = await reqAllRoleList(
    pageNo.value,
    pageSize.value,
    roleValue.value,
  )
  tableData.value = result.data.records
  total.value = result.data.total
}
const handleSizeChange = () => {
  getData()
}
const updateMenu = (row) => {}
const deleteMenu = (id) => {
  reqRemoveRole(id)
    .then((res) => {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      getData(tableData.value.length > 1 ? pageNo.value : pageNo.value - 1)
    })
    .catch(() => {
      ElMessage({
        type: 'error',
        message: '删除失败',
      })
    })
}
const save = async () => {
  console.log(roleParams.id)
  let arr1 = treeRef.value.getCheckedKeys()
  let arr2 = treeRef.value.getHalfCheckedKeys()
  // console.log(arr1)
  // console.log(arr2)
  let arr = arr1.concat(arr2)
  // console.log(arr)
  // return
  let result: any = await reqSetPermisstion(roleParams.id, arr)
  if (result.code == 200) {
    //抽屉关闭
    drawer.value = false
    //提示信息
    ElMessage({ type: 'success', message: '分配权限成功' })
    //页面刷新
    window.location.reload()
  }
  // console.log(arr1)
  // console.log(arr2)
}
const setMenu = (row) => {
  drawer.value = true
  Object.assign(roleParams, row)
  reqAllMenuList(row.id).then((res) => {
    console.log(res)
    treeData.value = res.data
    setTimeout(() => {
      selectArr.value = getSelectArr(res.data, [])
    })
  })
}
const close = () => {
  selectArr.value = []
}
const getSelectArr = (arr: any, initArr: any) => {
  // console.log(treeData.value)
  arr.forEach((item: any) => {
    // console.log(item)
    // return item.select ? item : ''
    if (item.select && item.level === 4) {
      // return item.id
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      getSelectArr(item.children, initArr)
    }
  })
  return initArr
  // console.log(arrr)
  // selectArr.value = arrr.map((item) => {
  //   // console.log(item.id)
  //   return item.id
  // })
  // // selectArr.value = arrr
  // console.log(selectArr.value)
}
onMounted(() => {
  getData()
})
</script>
<style lang="scss" scoped></style>
