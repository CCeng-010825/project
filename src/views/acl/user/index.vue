<template>
  <div>
    <el-card style="height: 80px">
      <div>
        <el-form :inline="true" class="container">
          <el-form-item label="用户名：">
            <el-input placeholder="请输入用户名" v-model="keyWord"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="reset">
              重置
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="search"
              :disabled="keyWord ? false : true"
            >
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card style="margin: 10px 0px">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button type="primary" :disabled="selectArr.length === 0" @click="del">
        批量删除
      </el-button>
      <el-table
        border
        style="margin: 10px 0px"
        :data="tableData"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column
          label="#"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="ID" align="center" prop="id"></el-table-column>
        <el-table-column
          label="用户名字"
          align="center"
          prop="username"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户名称"
          align="center"
          prop="name"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户角色"
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
              @click="setRole(row)"
            >
              分配角色
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateUser(row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`你确定要删除${row.username}?`"
              width="260px"
              @confirm="deleteUser(row.id)"
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
      <el-drawer v-model="drawer">
        <!-- 头部标题:将来文字内容应该动态的 -->
        <template #header>
          <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
        </template>
        <!-- 身体部分 -->
        <template #default>
          <el-form :model="userParams" :rules="rules" ref="formRef">
            <el-form-item label="用户姓名" prop="username">
              <el-input
                placeholder="请您输入用户姓名"
                v-model="userParams.username"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="name">
              <el-input
                placeholder="请您输入用户昵称"
                v-model="userParams.name"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="用户密码"
              prop="password"
              v-if="!userParams.id"
            >
              <el-input
                placeholder="请您输入用户密码"
                v-model="userParams.password"
              ></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="save">确定</el-button>
          </div>
        </template>
      </el-drawer>
      <el-drawer v-model="drawer1">
        <template #header>
          <h4>分配角色(职位)</h4>
        </template>
        <template #default>
          <el-form>
            <el-form-item label="用户姓名">
              <el-input
                v-model="userParams.username"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="职位列表">
              <el-checkbox
                @change="handleCheckAllChange"
                v-model="checkAll"
                :indeterminate="isIndeterminate"
              >
                全选
              </el-checkbox>
              <!-- 显示职位的的复选框 -->
              <el-checkbox-group
                v-model="userRole"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox
                  v-for="(role, index) in allRole"
                  :key="index"
                  :label="role"
                >
                  {{ role.roleName }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="drawer1 = false">取消</el-button>
            <el-button type="primary" @click="confirmClick">确定</el-button>
          </div>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  getUserData,
  addOrUpdateUser,
  reqRemoveUser,
  reqAllRole,
  reqSetUserRole,
  reqSelectUser,
} from '@/api/acl/user/index'
import {
  UserModel,
  ReqUserModel,
  User,
  RoleModel,
  AllRoleResponseData,
} from '@/api/acl/user/type'
import useLayOutSettingStore from '@/store/modules/setting'
import { ElMessage } from 'element-plus'
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)
let username = ref<string>('')
let tableData = ref<UserModel[]>([])
let drawer = ref<boolean>(false)
let formRef = ref<any>()
let drawer1 = ref<boolean>(false)
const checkAll = ref<boolean>(false)
const isIndeterminate = ref<boolean>(true)
const allRole = ref<RoleModel[]>([])
const userRole = ref<RoleModel[]>([])
const selectArr = ref<any>([])
let keyWord = ref<string>('')
let settingStore = useLayOutSettingStore()
let userParams = reactive<User>({
  name: '',
  username: '',
  password: '',
})
const handleSizeChange = () => {
  getData()
}
//校验用户名字回调函数
const validatorUsername = (rule: any, value: any, callBack: any) => {
  //用户名字|昵称,长度至少五位
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户名字至少五位'))
  }
}
//校验用户名字回调函数
const validatorname = (rule: any, value: any, callBack: any) => {
  //用户名字|昵称,长度至少五位
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户昵称至少五位'))
  }
}
const validatorPassword = (rule: any, value: any, callBack: any) => {
  //用户名字|昵称,长度至少五位
  if (value.trim().length >= 6) {
    callBack()
  } else {
    callBack(new Error('用户密码至少六位'))
  }
}
const rules = {
  username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
  //用户昵称
  name: [{ required: true, trigger: 'blur', validator: validatorname }],
  //用户的密码
  password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
}
const addUser = () => {
  drawer.value = true
  Object.assign(userParams, {
    id: 0,
    name: '',
    username: '',
    password: '',
  })
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}
const cancel = () => {
  drawer.value = false
}
const save = async () => {
  await formRef.value.validate()
  let result = await addOrUpdateUser(userParams)
  // console.log(result)
  if (result.code === 200) {
    drawer.value = false
    ElMessage({
      type: 'success',
      message: userParams.id ? '更新成功' : '添加成功',
    })
    getData(userParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: userParams.id ? '更新失败' : '添加失败',
    })
  }
}
const getData = async (pager = 1) => {
  pageNo.value = pager
  let result: ReqUserModel = await getUserData(
    pageNo.value,
    pageSize.value,
    keyWord.value,
  )
  // console.log(result)
  tableData.value = result.data.records
  total.value = result.data.total
}
const setRole = async (row: User) => {
  //存储已有的用户信息
  Object.assign(userParams, row)
  //获取全部的职位的数据与当前用户已有的职位的数据
  let result: AllRoleResponseData = await reqAllRole(userParams.id as number)
  if (result.code == 200) {
    //存储全部的职位
    allRole.value = result.data.allRolesList
    //存储当前用户已有的职位
    userRole.value = result.data.assignRoles
    //抽屉显示出来
    drawer1.value = true
  }
}
const deleteUser = async (id: number) => {
  let result: any = await reqRemoveUser(id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getData(tableData.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}
const updateUser = (row: User) => {
  drawer.value = true
  Object.assign(userParams, row)
  nextTick(() => {
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('username')
  })
}
onMounted(() => {
  getData()
})
const confirmClick = async () => {
  console.log(userRole.value)
  let data = {
    userId: userParams.id as number,
    roleIdList: userRole.value.map((item) => item.id),
  }
  let result: any = await reqSetUserRole(data)
  if (result.code == 200) {
    //提示信息
    ElMessage({ type: 'success', message: '分配职务成功' })
    //关闭抽屉
    drawer1.value = false
    //获取更新完毕用户的信息,更新完毕留在当前页
    getData(pageNo.value)
  }
}
const handleCheckAllChange = (val: string) => {
  console.log(val)

  userRole.value = val ? allRole.value : []
  // checkAll.value = true
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: any) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRole.value.length
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRole.value.length
}
const selectChange = (value: any) => {
  console.log(value)
  selectArr.value = value
}
const del = async () => {
  let idsList = selectArr.value.map((item: any) => item.id)
  let result: any = await reqSelectUser(idsList)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getData(tableData.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}
const search = () => {
  //根据关键字获取相应的用户数据
  getData()
  //清空关键字
  keyWord.value = ''
}
//重置按钮
const reset = () => {
  settingStore.refresh = !settingStore.refresh
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
