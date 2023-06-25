<template>
  <div>
    <el-card>
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        @click="addTradeMark"
      >
        添加品牌
      </el-button>
      <el-table :data="tableData" border style="margin: 10px 0px">
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column prop="tmName" label="品牌名称"></el-table-column>
        <el-table-column label="品牌LOGO">
          <template v-slot="{ row, $index }">
            <img :src="row.logoUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template v-slot="{ row, $index }">
            <el-button
              size="small"
              type="primary"
              icon="Edit"
              @click="updateTradeMark(row)"
            ></el-button>
            <el-popconfirm
              width="220"
              icon="Delete"
              icon-color="#626AEF"
              :title="`您确定删除${row.tmName}`"
              @confirm="deleteTradeMark(row.id)"
            >
              <template #reference>
                <el-button
                  size="small"
                  type="primary"
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
        @current-change="getTradeMarkList"
      />
    </el-card>
    <el-dialog
      v-model="dialogFormVisible"
      :title="tradeMarkParams.id ? '更新品牌' : '添加品牌'"
    >
      <el-form
        :model="tradeMarkParams"
        style="width: 80%"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="tradeMarkParams.tmName" />
        </el-form-item>
        <el-form-item label="品牌名称" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="tradeMarkParams.logoUrl"
              :src="tradeMarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import {
  getTradeMark,
  addOrUpdateTradeMark,
  removeTradeMark,
} from '@/api/product/trademark/index'
import { UploadProps, ElMessage } from 'element-plus'
import { Record, tradeMarkData, recordData } from '@/api/product/trademark/type'
let pageNo = ref<number>(1)
let limit = ref<number>(3)
let total = ref<number>(0)
let tableData = ref<Record>([])
let tradeMarkParams = reactive<recordData>({
  tmName: '',
  logoUrl: '',
})
let formRef = ref()
let dialogFormVisible = ref<boolean>(false)
const validatorName = (rule: any, value: any, callback: any) => {
  if (value && value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('商品名称长度小于2'))
  }
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  tradeMarkParams.logoUrl = response.data
  formRef.value.clearValidate('logoUrl')
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
  if (
    rawFile.type === 'image/png' ||
    rawFile.type === 'image/jpeg' ||
    rawFile.type === 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小小于4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式务必PNG|JPG|GIF',
    })
    return false
  }
}
const validatorUrl = (rule: any, value: any, callback: any) => {
  if (value) {
    callback()
  } else {
    callback(new Error('请上传图片'))
  }
}
const rules = {
  tmName: [{ required: true, trigger: 'blur', validator: validatorName }],
  logoUrl: [{ required: true, validator: validatorUrl }],
}

const getTradeMarkList = (pager = 1) => {
  pageNo.value = pager
  getTradeMark(pageNo.value, limit.value).then((res: tradeMarkData) => {
    total.value = res.data.total
    tableData.value = res.data.records
  })
}
const confirm = async () => {
  await formRef.value.validate()
  let result: any = await addOrUpdateTradeMark(tradeMarkParams)
  if (result.code === 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: `${tradeMarkParams.id ? '更新品牌成功' : '添加品牌成功'}`,
    })
    getTradeMarkList(tradeMarkParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: `${tradeMarkParams.id ? '更新品牌失败' : '添加品牌失败'}`,
    })
  }
}
const deleteTradeMark = async (id: number) => {
  let result: any = await removeTradeMark(id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
    getTradeMarkList(
      tableData.value.length > 1 ? pageNo.value : pageNo.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    })
  }
}
const handleSizeChange = () => {
  getTradeMarkList()
}
const addTradeMark = () => {
  dialogFormVisible.value = true
  tradeMarkParams.tmName = ''
  tradeMarkParams.logoUrl = ''
  tradeMarkParams.id = 0
  nextTick(() => {
    formRef.value.clearValidate()
  })
}
const updateTradeMark = (row: recordData) => {
  dialogFormVisible.value = true
  Object.assign(tradeMarkParams, row)
  nextTick(() => {
    formRef.value.clearValidate()
  })
}
onMounted(() => {
  getTradeMarkList()
})
</script>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
