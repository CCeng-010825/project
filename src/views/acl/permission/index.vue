<template>
  <div>
    <el-card>
      <el-table :data="tableData" row-key="id" border>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="权限值" prop="code"></el-table-column>

        <el-table-column label="修改时间" prop="updateTime"></el-table-column>

        <el-table-column label="操作">
          <template v-slot="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              @click="addMenu(row)"
              :disabled="row.level == 4 ? true : false"
            >
              {{ row.level === 3 ? '添加功能' : '添加菜单' }}
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="editMenu(row)"
              :disabled="row.level == 1 ? true : false"
            >
              编辑
            </el-button>
            <el-popconfirm
              width="260px"
              :title="`你确定要删除${row.name}吗？`"
              @confirm="deleteMenu(row.id)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  :disabled="row.level == 1 ? true : false"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog v-model="dialogVisible" :title="title">
        <!-- 表单组件:收集新增与已有的菜单的数据 -->
        <el-form>
          <el-form-item label="名称">
            <el-input
              placeholder="请你输入菜单名称"
              v-model="menuData.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-input
              placeholder="请你输入权限数值"
              v-model="menuData.code"
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="save">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import {
  reqAllPermisstion,
  reqAddOrUpdateMenu,
  reqRemoveMenu,
} from '@/api/acl/permission'
import { ElMessage } from 'element-plus'
import { ref, onMounted, reactive } from 'vue'
let tableData = ref<any>([])
let dialogVisible = ref<boolean>(false)
let title = ref<string>('')
let menuData = reactive({
  code: '',
  name: '',
  level: 0,
  pid: 0,
})
const getData = async () => {
  let result = await reqAllPermisstion()
  if (result.code === 200) {
    tableData.value = result.data
  }
}
const save = async () => {
  //发请求:新增子菜单|更新某一个已有的菜单的数据
  let result: any = await reqAddOrUpdateMenu(menuData)
  if (result.code == 200) {
    //对话框隐藏
    dialogVisible.value = false
    //提示信息
    ElMessage({
      type: 'success',
      message: menuData.id ? '更新成功' : '添加成功',
    })
    //再次获取全部最新的菜单的数据
    getData()
  }
}
const addMenu = (row) => {
  dialogVisible.value = true
  Object.assign(menuData, {
    code: '',
    name: '',
    level: 0,
    pid: 0,
    id: 0,
  })
  menuData.level = row.level + 1
  //给谁新增子菜单
  menuData.pid = row.id as number
  if (row.level === 3) {
    title.value = '添加功能'
  } else {
    title.value = '添加菜单'
  }
}
const editMenu = (row) => {
  Object.assign(menuData, row)
  dialogVisible.value = true
  title.value = '更新菜单'
}
const deleteMenu = async (id) => {
  let result = await reqRemoveMenu(id)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getData()
  }
}

onMounted(() => {
  getData()
})
// tableData.value = [
//   {
//     id: 1,
//     createTime: '2019-11-15 17:13:06',
//     updateTime: '2020-09-25 13:47:54',
//     pid: 0,
//     name: '全部数据',
//     code: null,
//     toCode: null,
//     type: 1,
//     status: null,
//     level: 1,
//     children: [
//       {
//         id: 7,
//         createTime: '2020-11-30 16:40:08',
//         updateTime: '2021-12-04 19:39:41',
//         pid: 1,
//         name: '权限管理',
//         code: 'Acl',
//         toCode: '',
//         type: 1,
//         status: null,
//         level: 2,
//         children: [
//           {
//             id: 8,
//             createTime: '2020-11-30 16:40:38',
//             updateTime: '2021-12-04 19:40:01',
//             pid: 7,
//             name: '用户管理',
//             code: 'User',
//             toCode: '',
//             type: 1,
//             status: null,
//             level: 3,
//             children: [
//               {
//                 id: 11,
//                 createTime: '2020-11-30 16:43:16',
//                 updateTime: '2021-12-04 19:42:37',
//                 pid: 8,
//                 name: '添加用户',
//                 code: 'btn.User.add',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 12,
//                 createTime: '2020-11-30 16:45:00',
//                 updateTime: '2021-12-04 19:42:39',
//                 pid: 8,
//                 name: '删除用户',
//                 code: 'btn.User.remove',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 13,
//                 createTime: '2020-11-30 16:45:32',
//                 updateTime: '2021-12-04 19:42:41',
//                 pid: 8,
//                 name: '修改用户',
//                 code: 'btn.User.update',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 14,
//                 createTime: '2020-11-30 16:46:08',
//                 updateTime: '2021-12-04 19:42:43',
//                 pid: 8,
//                 name: '分配角色',
//                 code: 'btn.User.assgin',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//             ],
//             select: false,
//           },
//           {
//             id: 9,
//             createTime: '2020-11-30 16:40:55',
//             updateTime: '2021-12-04 19:40:02',
//             pid: 7,
//             name: '角色管理',
//             code: 'Role',
//             toCode: '',
//             type: 1,
//             status: null,
//             level: 3,
//             children: [
//               {
//                 id: 15,
//                 createTime: '2020-11-30 16:50:13',
//                 updateTime: '2021-12-04 19:42:45',
//                 pid: 9,
//                 name: '分配权限',
//                 code: 'btn.Role.assgin',
//                 toCode: 'RoleAuth',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 16,
//                 createTime: '2020-11-30 16:50:56',
//                 updateTime: '2021-12-04 19:42:48',
//                 pid: 9,
//                 name: '添加角色',
//                 code: 'btn.Role.add',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 17,
//                 createTime: '2020-11-30 16:51:22',
//                 updateTime: '2021-12-04 19:42:50',
//                 pid: 9,
//                 name: '修改角色',
//                 code: 'btn.Role.update',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 18,
//                 createTime: '2020-11-30 16:52:34',
//                 updateTime: '2021-12-04 19:42:53',
//                 pid: 9,
//                 name: '删除角色',
//                 code: 'btn.Role.remove',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//             ],
//             select: false,
//           },
//           {
//             id: 10,
//             createTime: '2020-11-30 16:41:21',
//             updateTime: '2021-12-04 19:40:06',
//             pid: 7,
//             name: '菜单管理',
//             code: 'Permission',
//             toCode: '',
//             type: 1,
//             status: null,
//             level: 3,
//             children: [
//               {
//                 id: 19,
//                 createTime: '2020-11-30 16:56:23',
//                 updateTime: '2021-12-04 19:42:55',
//                 pid: 10,
//                 name: '添加',
//                 code: 'btn.Permission.add',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 20,
//                 createTime: '2020-11-30 16:59:02',
//                 updateTime: '2021-12-04 19:42:58',
//                 pid: 10,
//                 name: '修改',
//                 code: 'btn.Permission.update',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 21,
//                 createTime: '2020-11-30 16:59:27',
//                 updateTime: '2021-12-04 19:43:00',
//                 pid: 10,
//                 name: '删除',
//                 code: 'btn.Permission.remove',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//             ],
//             select: false,
//           },
//         ],
//         select: false,
//       },
//       {
//         id: 22,
//         createTime: '2020-12-01 08:15:00',
//         updateTime: '2021-12-04 19:43:28',
//         pid: 1,
//         name: '商品管理',
//         code: 'Product',
//         toCode: '',
//         type: 1,
//         status: null,
//         level: 2,
//         children: [
//           {
//             id: 23,
//             createTime: '2020-12-01 08:15:16',
//             updateTime: '2021-12-04 19:43:38',
//             pid: 22,
//             name: '分类管理',
//             code: 'Category',
//             toCode: '',
//             type: 1,
//             status: null,
//             level: 3,
//             children: [
//               {
//                 id: 44,
//                 createTime: '2020-12-01 08:58:39',
//                 updateTime: '2021-12-04 19:47:48',
//                 pid: 23,
//                 name: '添加子分类',
//                 code: 'btn.Category.add',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 45,
//                 createTime: '2020-12-01 08:59:00',
//                 updateTime: '2021-12-04 19:47:49',
//                 pid: 23,
//                 name: '修改分类',
//                 code: 'btn.Category.update',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 46,
//                 createTime: '2020-12-01 08:59:25',
//                 updateTime: '2021-12-04 19:47:52',
//                 pid: 23,
//                 name: '删除分类',
//                 code: 'btn.Category.remove',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//             ],
//             select: false,
//           },
//           {
//             id: 24,
//             createTime: '2020-12-01 08:15:34',
//             updateTime: '2021-12-04 19:44:28',
//             pid: 22,
//             name: '平台属性管理',
//             code: 'Attr',
//             toCode: '',
//             type: 1,
//             status: null,
//             level: 3,
//             children: [
//               {
//                 id: 50,
//                 createTime: '2020-12-01 09:16:18',
//                 updateTime: '2021-12-04 19:48:06',
//                 pid: 24,
//                 name: '添加属性',
//                 code: 'btn.Attr.add',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 51,
//                 createTime: '2020-12-01 09:18:52',
//                 updateTime: '2021-12-04 19:48:08',
//                 pid: 24,
//                 name: '更新属性',
//                 code: 'btn.Attr.update',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 52,
//                 createTime: '2020-12-01 09:19:09',
//                 updateTime: '2021-12-04 19:48:10',
//                 pid: 24,
//                 name: '删除属性',
//                 code: 'btn.Attr.remove',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//             ],
//             select: false,
//           },
//           {
//             id: 25,
//             createTime: '2020-12-01 08:15:48',
//             updateTime: '2021-12-04 19:44:40',
//             pid: 22,
//             name: '品牌管理',
//             code: 'Trademark',
//             toCode: '',
//             type: 1,
//             status: null,
//             level: 3,
//             children: [
//               {
//                 id: 47,
//                 createTime: '2020-12-01 09:05:22',
//                 updateTime: '2021-12-04 19:47:54',
//                 pid: 25,
//                 name: '添加品牌',
//                 code: 'btn.Trademark.add',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 48,
//                 createTime: '2020-12-01 09:06:07',
//                 updateTime: '2021-12-04 19:47:56',
//                 pid: 25,
//                 name: '修改品牌',
//                 code: 'btn.Trademark.update',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 49,
//                 createTime: '2020-12-01 09:06:28',
//                 updateTime: '2021-12-04 19:48:03',
//                 pid: 25,
//                 name: '删除品牌',
//                 code: 'btn.Trademark.remove',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//             ],
//             select: false,
//           },
//           {
//             id: 26,
//             createTime: '2020-12-01 08:16:14',
//             updateTime: '2021-12-04 19:44:52',
//             pid: 22,
//             name: 'SPU管理',
//             code: 'Spu',
//             toCode: '',
//             type: 1,
//             status: null,
//             level: 3,
//             children: [
//               {
//                 id: 53,
//                 createTime: '2020-12-01 09:22:40',
//                 updateTime: '2021-12-04 19:48:13',
//                 pid: 26,
//                 name: '添加SPU',
//                 code: 'btn.Spu.add',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 54,
//                 createTime: '2020-12-01 09:24:30',
//                 updateTime: '2021-12-04 19:48:15',
//                 pid: 26,
//                 name: '添加SKU',
//                 code: 'btn.Spu.addsku',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 55,
//                 createTime: '2020-12-01 09:24:54',
//                 updateTime: '2021-12-04 19:48:17',
//                 pid: 26,
//                 name: '更新Spu',
//                 code: 'btn.Spu.update',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 56,
//                 createTime: '2020-12-01 09:25:27',
//                 updateTime: '2021-12-04 19:48:19',
//                 pid: 26,
//                 name: '查看SKU列表',
//                 code: 'btn.Spu.skus',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 57,
//                 createTime: '2020-12-01 09:25:52',
//                 updateTime: '2021-12-04 19:48:21',
//                 pid: 26,
//                 name: '删除Spu',
//                 code: 'btn.Spu.delete',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 2287,
//                 createTime: '2020-12-01 08:23:20',
//                 updateTime: '2021-12-04 19:46:50',
//                 pid: 26,
//                 name: '2222',
//                 code: '1111',
//                 toCode: '',
//                 type: 1,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//             ],
//             select: false,
//           },
//           {
//             id: 27,
//             createTime: '2020-12-01 08:16:30',
//             updateTime: '2021-12-04 19:45:05',
//             pid: 22,
//             name: 'Sku管理',
//             code: 'Sku',
//             toCode: '',
//             type: 1,
//             status: null,
//             level: 3,
//             children: [
//               {
//                 id: 58,
//                 createTime: '2020-12-01 09:32:09',
//                 updateTime: '2021-12-04 19:48:24',
//                 pid: 27,
//                 name: 'Sku上下架',
//                 code: 'btn.Sku.updown',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 59,
//                 createTime: '2020-12-01 09:33:42',
//                 updateTime: '2021-12-04 19:48:27',
//                 pid: 27,
//                 name: '更新SKU',
//                 code: 'btn.Sku.update',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 60,
//                 createTime: '2020-12-01 09:34:29',
//                 updateTime: '2021-12-04 19:48:30',
//                 pid: 27,
//                 name: 'Sku详情',
//                 code: 'btn.Sku.detail',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 61,
//                 createTime: '2020-12-01 09:34:48',
//                 updateTime: '2021-12-04 19:48:45',
//                 pid: 27,
//                 name: '删除Sku',
//                 code: 'btn.Sku.remove',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//             ],
//             select: false,
//           },
//         ],
//         select: false,
//       },
//       {
//         id: 28,
//         createTime: '2020-12-01 08:18:07',
//         updateTime: '2021-12-04 19:45:25',
//         pid: 1,
//         name: '订单管理',
//         code: 'Order',
//         toCode: '',
//         type: 1,
//         status: null,
//         level: 2,
//         children: [
//           {
//             id: 29,
//             createTime: '2020-12-01 08:19:31',
//             updateTime: '2021-12-04 19:45:43',
//             pid: 28,
//             name: '订单列表',
//             code: 'OrderList',
//             toCode: '',
//             type: 1,
//             status: null,
//             level: 3,
//             children: [
//               {
//                 id: 41,
//                 createTime: '2020-12-01 08:47:59',
//                 updateTime: '2021-12-04 19:47:37',
//                 pid: 29,
//                 name: '查看订单详情',
//                 code: 'btn.OrderList.detail',
//                 toCode: 'OrderShow',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 42,
//                 createTime: '2020-12-01 08:52:24',
//                 updateTime: '2021-12-04 19:47:39',
//                 pid: 29,
//                 name: '退款',
//                 code: 'btn.OrderList.Refund',
//                 toCode: 'Refund',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//             ],
//             select: false,
//           },
//           {
//             id: 62,
//             createTime: '2020-12-02 11:34:23',
//             updateTime: '2021-12-04 19:48:48',
//             pid: 28,
//             name: '退款管理',
//             code: 'Refund',
//             toCode: '',
//             type: 1,
//             status: null,
//             level: 3,
//             children: [],
//             select: false,
//           },
//         ],
//         select: false,
//       },
//       {
//         id: 30,
//         createTime: '2020-12-01 08:21:25',
//         updateTime: '2021-12-04 19:46:05',
//         pid: 1,
//         name: '客户管理',
//         code: 'ClientUser',
//         toCode: '',
//         type: 1,
//         status: null,
//         level: 2,
//         children: [
//           {
//             id: 31,
//             createTime: '2020-12-01 08:22:08',
//             updateTime: '2021-12-04 19:46:20',
//             pid: 30,
//             name: '客户列表',
//             code: 'UserList',
//             toCode: '',
//             type: 1,
//             status: null,
//             level: 3,
//             children: [
//               {
//                 id: 43,
//                 createTime: '2020-12-01 08:53:49',
//                 updateTime: '2021-12-04 19:47:45',
//                 pid: 31,
//                 name: '锁定客户',
//                 code: 'btn.UserList.lock',
//                 toCode: '',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//             ],
//             select: false,
//           },
//         ],
//         select: false,
//       },
//       {
//         id: 32,
//         createTime: '2020-12-01 08:23:06',
//         updateTime: '2021-12-04 19:46:33',
//         pid: 1,
//         name: '优惠管理',
//         code: 'Discount',
//         toCode: '',
//         type: 1,
//         status: null,
//         level: 2,
//         children: [
//           {
//             id: 33,
//             createTime: '2020-12-01 08:23:20',
//             updateTime: '2021-12-04 19:46:50',
//             pid: 32,
//             name: '优惠活动管理',
//             code: 'Activity',
//             toCode: '',
//             type: 1,
//             status: null,
//             level: 3,
//             children: [
//               {
//                 id: 35,
//                 createTime: '2020-12-01 08:38:57',
//                 updateTime: '2021-12-04 19:47:22',
//                 pid: 33,
//                 name: '添加活动',
//                 code: 'btn.Activity.add',
//                 toCode: 'ActivityAdd',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 36,
//                 createTime: '2020-12-01 08:39:50',
//                 updateTime: '2021-12-04 19:47:24',
//                 pid: 33,
//                 name: '修改活动',
//                 code: 'btn.Activity.update',
//                 toCode: 'ActivityEdit',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 37,
//                 createTime: '2020-12-01 08:40:20',
//                 updateTime: '2021-12-04 19:47:26',
//                 pid: 33,
//                 name: '活动规则',
//                 code: 'btn.Activity.rule',
//                 toCode: 'ActivityRule',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//             ],
//             select: false,
//           },
//           {
//             id: 34,
//             createTime: '2020-12-01 08:23:46',
//             updateTime: '2021-12-04 19:47:03',
//             pid: 32,
//             name: '优惠券管理',
//             code: 'Coupon',
//             toCode: '',
//             type: 1,
//             status: null,
//             level: 3,
//             children: [
//               {
//                 id: 38,
//                 createTime: '2020-12-01 08:40:58',
//                 updateTime: '2021-12-04 19:47:28',
//                 pid: 34,
//                 name: '添加优惠券',
//                 code: 'btn.Coupon.add',
//                 toCode: 'CouponAdd',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 39,
//                 createTime: '2020-12-01 08:41:34',
//                 updateTime: '2021-12-04 19:47:30',
//                 pid: 34,
//                 name: '修改优惠券',
//                 code: 'btn.Coupon.update',
//                 toCode: 'CouponEdit',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//               {
//                 id: 40,
//                 createTime: '2020-12-01 08:42:24',
//                 updateTime: '2021-12-04 19:47:33',
//                 pid: 34,
//                 name: '活动规则',
//                 code: 'btn.Coupon.rule',
//                 toCode: 'CouponRule',
//                 type: 2,
//                 status: null,
//                 level: 4,
//                 children: [],
//                 select: false,
//               },
//             ],
//             select: false,
//           },
//         ],
//         select: false,
//       },
//       {
//         id: 100,
//         createTime: '2021-12-04 19:36:19',
//         updateTime: '2021-12-04 19:39:57',
//         pid: 1,
//         name: '全部',
//         code: 'btn.all',
//         toCode: null,
//         type: 2,
//         status: null,
//         level: 2,
//         children: [],
//         select: false,
//       },
//       {
//         id: 2555,
//         createTime: '2023-07-19 16:46:07',
//         updateTime: '2023-07-19 16:46:07',
//         pid: 1,
//         name: '运维管理',
//         code: 'Yunwei',
//         toCode: null,
//         type: 0,
//         status: null,
//         level: 2,
//         children: [],
//         select: false,
//       },
//       {
//         id: 2556,
//         createTime: '2023-07-19 16:47:33',
//         updateTime: '2023-07-19 16:47:33',
//         pid: 1,
//         name: '商城维护',
//         code: 'Shangecheng',
//         toCode: null,
//         type: 0,
//         status: null,
//         level: 2,
//         children: [],
//         select: false,
//       },
//     ],
//     select: false,
//   },
// ]
</script>
<style lang="scss" scoped></style>
