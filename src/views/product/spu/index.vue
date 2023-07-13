<template>
  <div>
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0px">
      <div v-show="scene === 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
          @click="addSpu"
        >
          添加SPU
        </el-button>
        <el-table border style="margin: 10px 0px" :data="tableData">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>

          <el-table-column label="SPU描述" prop="description"></el-table-column>

          <el-table-column label="SPU操作">
            <template v-slot="{ row, $index }">
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                title="添加Sku"
                @click="addSku(row)"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                title="修改SPU"
                @click="addOrUpdateSpu(row)"
              ></el-button>
              <el-button type="primary" size="small" icon="View"></el-button>
              <el-popconfirm
                :title="`你确定删除${row.spuName}?`"
                width="200px"
                @confirm="deleteSpu(row)"
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
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="limit"
          :pager-count="7"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout="prev, pager, next, jumper, ->, sizes,total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="getInitSpuData"
        ></el-pagination>
      </div>
      <SkuForm v-show="scene === 1" ref="sku" @changeScene="change"></SkuForm>
      <SpuForm v-show="scene === 2" ref="spu" @changeScene="change"></SpuForm>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { getSpuList, removeSpu } from '@/api/product/spu/index'
import { HasSpuData, SpuData } from '@/api/product/spu/type'
import SkuForm from './skuForm.vue'
import SpuForm from './spuForm.vue'
import useCategoryStore from '@/store/modules/category'
import { ElMessage } from 'element-plus'
let categoryStore = useCategoryStore()
// defineEmits({ initSkuData })
let scene = ref<number>(0)
let total = ref<number>(0)
let pageNo = ref<number>(1)
let limit = ref<number>(3)
let tableData = ref<SpuData[]>([])
let sku = ref<any>()
let spu = ref<any>()
watch(
  () => categoryStore.c3Id,
  () => {
    tableData.value = []
    if (!categoryStore.c3Id) {
      return
    }
    getInitSpuData()
  },
)
const getInitSpuData = (pager = 1) => {
  pageNo.value = pager
  getSpuList(pageNo.value, limit.value, categoryStore.c3Id).then(
    (res: HasSpuData) => {
      tableData.value = res.data.records
      total.value = res.data.total
      // console.log(tableData.value)
    },
  )
}
const handleSizeChange = () => {
  getInitSpuData()
}
const addSku = (row: any) => {
  scene.value = 1
  // console.log(row)
  // initSkuData()
  // console.log(sku.value)
  sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}
const change = (obj: any) => {
  // console.log(obj)
  scene.value = obj.flag
  if (obj.params === 'add') {
    getInitSpuData()
  } else {
    getInitSpuData(pageNo.value)
  }
}
const deleteSpu = async (row: any) => {
  let result = await removeSpu(row.id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getInitSpuData(tableData.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
const addSpu = () => {
  scene.value = 2
  spu.value.addSpuData(categoryStore.c3Id)
}
const addOrUpdateSpu = (row) => {
  scene.value = 2
  spu.value.initSpuData(categoryStore.c1Id, categoryStore.c2Id, row)
}
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>
<style lang="scss" scoped></style>
