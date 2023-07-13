<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin: 10px 0">
      <div v-if="scene === 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
          @click="addAttr"
        >
          添加属性
        </el-button>
        <el-table style="margin: 10px 0" border :data="tableData">
          <el-table-column
            label="序号"
            type="index"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            width="120px"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template v-slot="{ row, $index }">
              <el-tag
                v-for="(item, index) in row.attrValueList"
                :key="index"
                type="success"
                style="margin: 5px"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template v-slot="{ row, $index }">
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="edit(row)"
              ></el-button>
              <el-popconfirm
                width="220"
                icon="Delete"
                icon-color="#626AEF"
                :title="`您确定删除${row.attrName}`"
                @confirm="remove(row.id)"
              >
                <template #reference>
                  <el-button
                    type="primary"
                    size="small"
                    icon="Delete"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else>
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请你输入属性名称"
              v-model="attrValueData.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="attrValueData.attrName ? false : true"
          @click="addAttrName"
        >
          添加属性值
        </el-button>
        <el-button type="primary" size="default" @click="scene = 0">
          取消
        </el-button>
        <el-table
          :data="attrValueData.attrValueList"
          border
          style="margin: 10px 0"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template v-slot="{ row, $index }">
              <el-input
                :ref="(vc:any)=>inputArr[$index]=vc"
                placeholder="请输入属性值名称"
                v-if="row.flag"
                size="small"
                @blur="showDiv(row, $index)"
                v-model="row.valueName"
              ></el-input>
              <div v-else @click="goEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template v-slot="{ row, $index }">
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="editAttr"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="Delete"
                @click="removeAttr($index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          size="default"
          @click="save"
          :disabled="attrValueData.attrValueList.length > 0 ? false : true"
        >
          保存
        </el-button>
        <el-button type="primary" size="default" @click="scene = 0">
          取消
        </el-button>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { nextTick, reactive, ref, watch, onBeforeUnmount } from 'vue'
import {
  getAttrInfoList,
  saveAttrValue,
  deleteAttrValue,
} from '@/api/product/attr'
import useCategoryStore from '@/store/modules/category'
import {
  AttrInfoResponseData,
  AttrValueData,
  AttrValue,
} from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'
let categoryStore = useCategoryStore()
let scene = ref<number>(0)
let inputArr = ref<any>([])
let tableData = ref<AttrValueData[]>([])
let attrValueData = reactive<AttrValueData>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})
const getInfoList = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  let result: AttrInfoResponseData = await getAttrInfoList(c1Id, c2Id, c3Id)
  tableData.value = result.data
}
watch(
  () => categoryStore.c3Id,
  () => {
    if (!categoryStore.c3Id) {
      return
    }
    getInfoList()
  },
)
const addAttrName = () => {
  attrValueData.attrValueList.push({
    valueName: '',
    flag: true,
  })
  nextTick(() => {
    inputArr.value[attrValueData.attrValueList.length - 1].focus()
  })
}
const save = async () => {
  let result = await saveAttrValue(attrValueData)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: attrValueData.id ? '更新成功' : '新增成功',
    })
    scene.value = 0
    getInfoList()
  } else {
    ElMessage({
      type: 'error',
      message: attrValueData.id ? '更新失败' : '新增失败',
    })
  }
}
const showDiv = (row: AttrValue, $index: number) => {
  if (row.valueName.trim().length === 0) {
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    attrValueData.attrValueList.splice($index, 1)
  }
  let repeat = attrValueData.attrValueList.find((item) => {
    if (item !== row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    attrValueData.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }
  row.flag = false
}
const goEdit = (row: AttrValue, $index: number) => {
  row.flag = true
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}
const edit = (row: any) => {
  scene.value = 1
  Object.assign(attrValueData, JSON.parse(JSON.stringify(row)))
}
const remove = (id: number) => {
  deleteAttrValue(id)
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      getInfoList()
    })
    .catch(() => {
      ElMessage({
        type: 'error',
        message: '删除失败',
      })
    })
}
const addAttr = () => {
  scene.value = 1
  Object.assign(attrValueData, {
    attrName: '',
    attrValueList: [],
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
  })
}
const editAttr = () => {
  console.log('editAttr')
}
const removeAttr = ($index: number) => {
  attrValueData.attrValueList.splice($index, 1)
}
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>
<style lang="scss" scoped></style>
