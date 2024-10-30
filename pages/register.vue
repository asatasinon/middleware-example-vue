<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          创建新账号
        </h2>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md shadow-sm -space-y-px">
          <!-- 用户名输入框 -->
          <div>
            <label for="username" class="sr-only">用户名</label>
            <input 
              id="username" 
              v-model="username" 
              type="text" 
              required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
              placeholder="用户名"
            >
          </div>
          <!-- 邮箱输入框 -->
          <div>
            <label for="email" class="sr-only">邮箱地址</label>
            <input 
              id="email" 
              v-model="email" 
              type="email" 
              required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
              placeholder="邮箱地址"
            >
          </div>
          <!-- 密码输入框 -->
          <div>
            <label for="password" class="sr-only">密码</label>
            <input 
              id="password" 
              v-model="password" 
              type="password" 
              required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
              placeholder="密码"
            >
          </div>
          <!-- 确认密码输入框 -->
          <div>
            <label for="confirmPassword" class="sr-only">确认密码</label>
            <input 
              id="confirmPassword" 
              v-model="confirmPassword" 
              type="password" 
              required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
              placeholder="确认密码"
            >
          </div>
        </div>

        <!-- 注册按钮 -->
        <div>
          <button 
            type="submit" 
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :disabled="loading"
          >
            <span v-if="loading">注册中...</span>
            <span v-else>注册</span>
          </button>
        </div>

        <!-- 登录链接 -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            已有账号？
            <NuxtLink to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
              立即登录
            </NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { validateEmail, validatePassword, validateUsername } from '~/utils/validation'

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')
const usernameError = ref('')
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')

// 表单验证
const validateForm = () => {
  let isValid = true
  error.value = ''
  usernameError.value = ''
  emailError.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''

  if (!validateUsername(username.value)) {
    usernameError.value = '用户名3-20位，只能包含字母、数字和下划线'
    isValid = false
  }

  if (!validateEmail(email.value)) {
    emailError.value = '请输入有效的邮箱地址'
    isValid = false
  }

  if (!validatePassword(password.value)) {
    passwordError.value = '密码至少8位，需包含大小写字母和数字'
    isValid = false
  }

  if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = '两次输入的密码不一致'
    isValid = false
  }

  return isValid
}

// 实时验证
watch([username, email, password, confirmPassword], () => {
  if (usernameError.value) {
    usernameError.value = validateUsername(username.value) ? '' : '用户名3-20位，只能包含字母、数字和下划线'
  }
  if (emailError.value) {
    emailError.value = validateEmail(email.value) ? '' : '请输入有效的邮箱地址'
  }
  if (passwordError.value) {
    passwordError.value = validatePassword(password.value) ? '' : '密码至少8位，需包含大小写字母和数字'
  }
  if (confirmPasswordError.value && password.value === confirmPassword.value) {
    confirmPasswordError.value = ''
  }
})

const handleRegister = async () => {
  if (!validateForm()) return

  try {
    loading.value = true
    // TODO: 实现注册逻辑
    const registerData = {
      username: username.value,
      email: email.value,
      password: password.value
    }
    
    // 模拟注册请求
    // const response = await $fetch('/api/register', {
    //   method: 'POST',
    //   body: registerData
    // })

  } catch (err) {
    error.value = err.message || '注册失败，请稍后重试'
  } finally {
    loading.value = false
  }
}
</script> 