<template>
  <div class="container">
    <el-row>
      <el-col :span="12" class="container-left" :xs="0"></el-col>
      <el-col :span="12" class="container-right" :xs="24">
        <el-form
          ref="loginForms"
          :model="loginForm"
          :rules="rules"
          class="login_form"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              show-password
              :prefix-icon="Lock"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="login"
              class="login_button"
              :loading="loading"
              type="primary"
              size="default"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, toRefs, ref, onBeforeMount, onMounted } from 'vue'
import { ElNotification } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import getTime from '@/utils/time'
import { userLogin } from '@/api/user'
// import { login } from 'mock/user'
import axios from 'axios'
let loginForms = ref()
console.log(loginForms)
let $router = useRouter()
let loginForm = reactive({ username: 'admin', password: 'atguigu123' })
let loading = ref(false)
const validatorUserName = (rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('用户名最低5位'))
  }
}
const validatorPassWord = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度最低6位'))
  }
}
const rules = {
  username: [{ trigger: 'change', validator: validatorUserName }],
  password: [{ trigger: 'change', validator: validatorPassWord }],
}
const login = async () => {
  //   console.log('123')
  //   console.log(login)
  //   axios
  //     .post('/api/user/login', {
  //       username: 'admin',
  //       password: '111111',
  //     })
  //     .then((res) => {
  //       console.log(res)
  //     })
  await loginForms.value.validate()
  const data = {
    username: loginForm.username,
    password: loginForm.password,
  }
  userLogin(data).then((res) => {
    // console.log(res)
    $router.push('/home')
  })
  // let res = await userLogin(data)
  // console.log(res)
  // loading.value = true
  // ElNotification({
  //   type: 'success',
  //   message: '登陆成功',
  // })
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    .login_button {
      width: 100%;
    }
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }
  }
}
</style>
