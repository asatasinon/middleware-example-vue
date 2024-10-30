<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          重置密码
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          输入您的邮箱，我们将发送重置密码链接
        </p>
      </div>

      <div v-if="error" class="text-sm text-red-600 text-center">
        {{ error }}
      </div>
      
      <div v-if="success" class="text-sm text-green-600 text-center">
        {{ success }}
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label for="email" class="sr-only">邮箱地址</label>
          <input 
            id="email" 
            v-model="email" 
            type="email" 
            required 
            class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
            placeholder="邮箱地址"
          >
        </div>

        <div v-if="emailError" class="text-xs text-red-600">
          {{ emailError }}
        </div>

        <div>
          <button 
            type="submit" 
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :disabled="loading"
          >
            <span v-if="loading">发送中...</span>
            <span v-else>发送重置链接</span>
          </button>
        </div>

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
import { validateEmail } from '~/utils/validation'

const email = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')
const emailError = ref('')

const handleSubmit = async () => {
  if (!validateEmail(email.value)) {
    emailError.value = '请输入有效的邮箱地址'
    return
  }

  try {
    loading.value = true
    // TODO: 实现发送重置密码邮件的逻辑
    // const response = await $fetch('/api/forgot-password', {
    //   method: 'POST',
    //   body: { email: email.value }
    // })
    
    success.value = '重置密码链接已发送到您的邮箱，请查收'
    email.value = ''
  } catch (err: any) {
    error.value = err?.message || '发送失败，请稍后重试'
  } finally {
    loading.value = false
  }
}
</script>