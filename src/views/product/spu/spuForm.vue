<template>
  <div>
    <el-form label-width="100px" :data="formData">
      <el-form-item label="spu名称">
        <el-input
          placeholder="请输入spu名称"
          v-model="formData.spuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="spu品牌">
        <el-select v-model="formData.tmId" placeholder="请选择">
          <el-option
            :label="item.tmName"
            :value="item.id"
            :key="item.id"
            v-for="(item, index) in tradeMark"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="spu描述">
        <el-input
          placeholder="请输入spu描述"
          type="textarea"
          v-model="formData.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="spu图片">
        <el-upload
          v-model:file-list="imageList"
          action="/api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :before-upload="handleBefore"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img
            w-full
            :src="dialogImageUrl"
            alt="Preview Image"
            style="width: 100%; height: 100%"
          />
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <!-- <el-input placeholder="请选择"></el-input> -->
        <el-select
          :placeholder="`还未选择${unSelectAttrValue.length}个`"
          v-model="saleAttrIdAndValueName"
        >
          <el-option
            :label="item.name"
            :value="`${item.id}:${item.name}`"
            :key="item.id"
            v-for="(item, index) in unSelectAttrValue"
          ></el-option>
        </el-select>
        <el-button
          :disabled="saleAttrIdAndValueName ? false : true"
          type="primary"
          icon="Plus"
          size="default"
          style="margin-left: 10px"
          @click="addSaleAttr"
        >
          添加属性
        </el-button>
        <el-table style="margin: 10px 0px" border :data="spuSaleAttr">
          <el-table-column
            label="序号"
            type="index"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="销售属性名字"
            width="150px"
            prop="saleAttrName"
          ></el-table-column>
          <el-table-column label="销售属性值">
            <template v-slot="{ row, $index }">
              <el-tag
                style="margin: 0px 5px"
                v-for="(item, index) in row.spuSaleAttrValueList"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
                :key="item.id"
                class="mx-1"
                closable
              >
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-input
                @blur="toLook(row)"
                v-model="row.saleAttrValue"
                v-if="row.flag == true"
                placeholder="请你输入属性值"
                size="small"
                style="width: 100px"
              ></el-input>
              <el-button
                @click="toEdit(row)"
                v-else
                type="primary"
                size="small"
                icon="Plus"
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template #="{ row, $index }">
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="save">保存</el-button>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import {
  tradeMarkData,
  SpuHasImg,
  AllSaleAttr,
  SpuData,
} from '@/api/product/spu/type'
import {
  reqAllTradeMark,
  reqSpuHasImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
  reqAddOrUpdateSpu,
} from '@/api/product/spu'
import { computed, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
let formData = ref<SpuData>({
  category3Id: '',
  spuName: '',
  tmId: '',
  description: '',
  spuImageList: [],
  spuPosterList: [],
  spuSaleAttrList: [],
})
// saleAttrIdAndValueName: '',
let saleAttrIdAndValueName = ref('')
let tradeMark = ref<any[]>([])
let imageList = ref<any[]>([])
let spuSaleAttr = ref<any[]>([])
let allSaleAttr = ref<any[]>([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const initSpuData = async (
  c1Id: string | number,
  c2Id: string | number,
  spu: any,
) => {
  // console.log(spu)
  formData.value = spu
  let result: tradeMarkData = await reqAllTradeMark()
  // console.log(result)
  let result1: SpuHasImg = await reqSpuHasImageList(spu.id)
  // console.log(result1)
  let result2: any = await reqSpuHasSaleAttr(spu.id)
  // console.log(result2)
  let result3: AllSaleAttr = await reqAllSaleAttr()
  // console.log(result3)
  tradeMark.value = result.data
  // imageList.value = result1.data
  spuSaleAttr.value = result2.data
  allSaleAttr.value = result3.data
  imageList.value = result1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
}

let unSelectAttrValue = computed(() => {
  return allSaleAttr.value.filter((item) => {
    // return !spuSaleAttr.value.includes(item)
    return spuSaleAttr.value.every((it) => {
      return item.name !== it.saleAttrName
    })
  })
})
const cancel = () => {
  $emit('changeScene', { flag: 0 })
}
const handleBefore = (file) => {
  // console.log(file)
  if (
    file.type === 'image/png' ||
    file.type === 'image/jpeg' ||
    file.type === 'image/gif'
  ) {
    if (file.size / 1024 / 1024 > 3) {
      ElMessage({
        type: 'error',
        message: '大小超过3M',
      })
      return false
    } else {
      return true
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传的不是图片',
    })
    return false
  }
}
const handlePictureCardPreview = (uploadFile: any) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
const handleRemove = () => {
  console.log(123)
}
const toLook = (row: any) => {
  // console.log(row, 'look')
  row.flag = false
  const { baseSaleAttrId, saleAttrValue } = row
  let newSaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue,
  }
  // row.spuSaleAttrValueList.push({ saleAttrValueName: row.saleAttrValue })
  if (saleAttrValue.trim().length === 0) {
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  let repeat = row.spuSaleAttrValueList.find((item: any) => {
    return saleAttrValue === item.saleAttrValueName
  })
  // console.log(repeat)
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值重复',
    })
    // row.spuSaleAttrValueList.splice()
    return
  }
  row.spuSaleAttrValueList.push(newSaleAttrValue)
}
const toEdit = (row: any) => {
  // console.log(row, 'edit')
  row.flag = true
  row.saleAttrValue = ''
}
const addSaleAttr = () => {
  // spuSaleAttr.push()
  // console.log(saleAttrIdAndValueName)
  let [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
  // console.log(attrId, saleAttrName)
  spuSaleAttr.value.push({
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  })
  saleAttrIdAndValueName.value = ''
}
const save = async () => {
  // console.log(formData.value)
  formData.value.spuImageList = imageList.value.map((item) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })
  // console.log(formData.value.spuImageList)
  formData.value.spuSaleAttrList = spuSaleAttr.value
  // console.log(formData.value.spuSaleAttrList)
  let result = await reqAddOrUpdateSpu(formData.value)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: formData.value.id ? '更新成功' : '添加成功',
    })
    $emit('changeScene', {
      flag: 0,
      params: formData.value.id ? 'update' : 'add',
    })
  } else {
    ElMessage({
      type: 'error',
      message: formData.value.id ? '更新失败' : '添加失败',
    })
  }
}

const addSpuData = async (c3Id) => {
  Object.assign(formData.value, {
    // category3Id: '',
    spuName: '',
    tmId: '',
    description: '',
    spuImageList: [],
    spuPosterList: [],
    spuSaleAttrList: [],
  })
  imageList.value = []
  spuSaleAttr.value = []
  saleAttrIdAndValueName.value = ''
  let result: tradeMarkData = await reqAllTradeMark()
  let result3: AllSaleAttr = await reqAllSaleAttr()
  tradeMark.value = result.data
  allSaleAttr.value = result3.data
  formData.value.category3Id = c3Id
  // formData.value.spuImageList = imageList.value.map((item) => {
  //   return {
  //     imgName: item.name,
  //     imgUrl: (item.response && item.response.data) || item.url,
  //   }
  // })
  // formData.value.spuSaleAttrList = spuSaleAttr.value
  // console.log(formData.value)
}
defineExpose({ initSpuData, addSpuData })
let $emit = defineEmits(['changeScene'])
</script>
<style lang="scss" scoped></style>
