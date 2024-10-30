
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          重置密码
        </h2>
      </div>

      <div v-if="error" class="text-sm text-red-600 text-center">
        {{ error }}
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleReset">
        <div class="rounded-md shadow-sm -space-y-px">
          <!-- 新密码输入框 -->
          <div>
            <label for="password" class="sr-only">新密码</label>
            <input 
              id="password" 
              v-model="password" 
              type="password" 
              required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
              placeholder="新密码"
            >
            <div v-if="passwordError" class="text-xs text-red-600 mt-1 px-2">
              {{ passwordError }}
            </div>
          </div>
          
          <!-- 确认新密码输入框 -->
          <div>
            <label for="confirmPassword" class="sr-only">确认新密码</label>
            <input 
              id="confirmPassword" 
              v-model="confirmPassword" 
              type="password" 
              required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
              placeholder="确认新密码"
            >
            <div v-if="confirmPasswordError" class="text-xs text-red-600 mt-1 px-2">
              {{ confirmPasswordError }}
            </div>
          </div>
        </div>

        <!-- 重置按钮 -->
        <div>
          <button 
            type="submit" 
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :disabled="loading"
          >
            <span v-if="loading">重置中...</span>
            <span v-else>重置密码</span>
          </button>
        </div>

        <!-- 返回登录链接 -->
        <div class="text-center">
          <NuxtLink to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
            返回登录
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template> 

<script setup lang="ts">
import { ref } from 'vue'
import { validatePassword } from '~/utils/validation'
import { useRouter, useRoute } from '#app'

const router = useRouter()
const route = useRoute()

const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')

// 获取 URL 中的重置令牌
const token = route.query.token as string

const validateForm = () => {
  let isValid = true
  error.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''

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

const handleReset = async () => {
  if (!validateForm()) return
  
  if (!token) {
    error.value = '无效的重置链接'
    return
  }

  try {
    loading.value = true
    // TODO: 实现重置密码的逻辑
    // const response = await $fetch('/api/reset-password', {
    //   method: 'POST',
    //   body: {
    //     token,
    //     password: password.value
    //   }
    // })

    // 模拟重置成功
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 显示成功提示并跳转到登录页
    alert('密码重置成功，请使用新密码登录')
    router.push('/login')
    
  } catch (err: any) {
    error.value = err?.message || '重置密码失败，请稍后重试'
  } finally {
    loading.value = false
  }
}
</script>
