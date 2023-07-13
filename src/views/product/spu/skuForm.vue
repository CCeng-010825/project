<template>
  <div>
    <el-form :data="formData">
      <el-form-item label="SKU名称" label-width="100px">
        <el-input v-model="formData.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)" label-width="100px" type="number">
        <el-input v-model="formData.price" placeholder="价格（元）"></el-input>
      </el-form-item>
      <el-form-item label="重量(g)" label-width="100px" type="number">
        <el-input v-model="formData.weight" placeholder="重量(g)"></el-input>
      </el-form-item>
      <el-form-item label="SKU描述" label-width="100px">
        <el-input v-model="formData.skuDesc" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="平台属性" label-width="100px">
        <template v-slot="{ row, $index }">
          <el-form :inline="true">
            <el-form-item
              v-for="(item, index) in attr"
              :key="item.id"
              :label="item.attrName"
            >
              <el-select v-model="item.attrIdAndValueId">
                <el-option
                  :label="it.valueName"
                  :value="`${it.id}:${item.id}`"
                  v-for="(it, index) in item.attrValueList"
                  :key="index"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </template>
      </el-form-item>
      <el-form-item label="销售属性" label-width="100px">
        <el-form :inline="true">
          <el-form-item
            v-for="(item, index) in spuValue"
            :key="item.id"
            :label="item.saleAttrName"
          >
            <el-select v-model="item.saleIdAndValueId">
              <el-option
                :key="index"
                :label="it.saleAttrValueName"
                :value="`${item.id}:${it.id}`"
                v-for="(it, index) in item.spuSaleAttrValueList"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称" label-width="100px">
        <el-table border ref="table" :data="image" style="width: 100%">
          <!-- @selection-change="handleSelectionChange" -->
          <el-table-column type="selection" width="55" />
          <el-table-column label="图片">
            <template #="{ row, $index }">
              <img :src="row.imgUrl" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName" />
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button type="primary" @click="handler(row)">
                设为默认
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label-width="100px">
        <el-button type="primary" size="default" @click="save">保存</el-button>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { getAttrInfoList } from '@/api/product/attr/index'
import {
  reqSpuHasImageList,
  reqSpuHasSaleAttr,
  reqAddSku,
} from '@/api/product/spu/index'
import { SpuHasImg, SkuData } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
let formData = reactive<SkuData>({
  category3Id: '', //三级分类的ID
  spuId: '', //已有的SPU的ID
  tmId: '', //SPU品牌的ID
  skuName: '', //sku名字
  price: '', //sku价格
  weight: '', //sku重量
  skuDesc: '', //sku的描述
  skuAttrValueList: [
    //平台属性的收集
  ],
  skuSaleAttrValueList: [
    //销售属性
  ],
  skuImageList: [],
  skuDefaultImg: '', //sku图片地址
})
let table = ref<any>()
let attr = ref<any>([])
let image = ref<any>([])
let spuValue = ref<any>([])
const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  spu: any,
) => {
  Object.assign(formData, {
    category3Id: '', //三级分类的ID
    spuId: '', //已有的SPU的ID
    tmId: '', //SPU品牌的ID
    skuName: '', //sku名字
    price: '', //sku价格
    weight: '', //sku重量
    skuDesc: '', //sku的描述
    skuAttrValueList: [
      //平台属性的收集
    ],
    skuSaleAttrValueList: [
      //销售属性
    ],
    skuImageList: [],
    skuDefaultImg: '', //sku图片地址
  })
  formData.category3Id = spu.category3Id
  formData.spuId = spu.id
  formData.tmId = spu.tmId
  let result: any = await getAttrInfoList(c1Id, c2Id, spu.category3Id)
  attr.value = result.data
  let result1: any = await reqSpuHasImageList(spu.id)
  image.value = result1.data
  let result2: any = await reqSpuHasSaleAttr(spu.id)
  spuValue.value = result2.data
}
defineExpose({ initSkuData })
// const handleSelectionChange = (event) => {
//   image.value.forEach((item: any) => {
//     table.value.toggleRowSelection(item, false)
//   })
//   table.value.toggleRowSelection(row, true)
//   formData.skuDefaultImg = row.imgUrl
// }
const handler = (row: any) => {
  image.value.forEach((item: any) => {
    table.value.toggleRowSelection(item, false)
  })
  table.value.toggleRowSelection(row, true)
  formData.skuDefaultImg = row.imgUrl
}
const save = async () => {
  console.log(formData)
  formData.skuAttrValueList = attr.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      let [valueId, attrId] = next.attrIdAndValueId.split(':')
      prev.push({ valueId, attrId })
    }
    return prev
  }, [])
  formData.skuSaleAttrValueList = spuValue.value.reduce(
    (prev: any, next: any) => {
      if (next.saleIdAndValueId) {
        let [saleAttrValueId, saleAttrId] = next.saleIdAndValueId.split(':')
        prev.push({
          saleAttrValueId,
          saleAttrId,
        })
      }
      return prev
    },
    [],
  )
  let result: any = await reqAddSku(formData)
  console.log(result)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '添加SKU成功',
    })
    $emit('changeScene', { flag: 0, params: '' })
  } else {
    ElMessage({
      type: 'error',
      message: '添加SKU失败',
    })
  }
}
const cancel = () => {
  $emit('changeScene', { flag: 0, params: '' })
}
let $emit = defineEmits(['changeScene'])
</script>
<style lang="scss" scoped></style>
