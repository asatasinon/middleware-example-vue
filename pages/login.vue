<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Logo 和标题 -->
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {{ t('auth.login') }}
        </h2>
      </div>
      
      <!-- 登录表单 -->
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <!-- 邮箱输入框 -->
          <div>
            <label for="email" class="sr-only">{{ t('auth.email') }}</label>
            <input 
              id="email" 
              v-model="email" 
              type="email" 
              required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
              :placeholder="t('auth.email')"
            >
            <div v-if="emailError" class="text-xs text-red-600 mt-1">
              {{ t('auth.errors.invalidEmail') }}
            </div>
          </div>
          <!-- 密码输入框 -->
          <div>
            <label for="password" class="sr-only">{{ t('auth.password') }}</label>
            <input 
              id="password" 
              v-model="password" 
              type="password" 
              required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
              :placeholder="t('auth.password')"
            >
            <div v-if="passwordError" class="text-xs text-red-600 mt-1">
              {{ t('auth.errors.invalidPassword') }}
            </div>
          </div>
        </div>

        <!-- 记住我和忘记密码 -->
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input 
              id="remember-me" 
              v-model="rememberMe" 
              type="checkbox" 
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            >
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              {{ t('auth.rememberMe') }}
            </label>
          </div>

          <div class="text-sm">
            <NuxtLink to="/forgot-password" class="font-medium text-indigo-600 hover:text-indigo-500">
              {{ t('auth.forgotPasswordLink') }}
            </NuxtLink>
          </div>
        </div>

        <!-- 错误提示 -->
        <div v-if="error" class="text-sm text-red-600 text-center">
          {{ t('auth.errors.loginFailed') }}
        </div>

        <!-- 登录按钮 -->
        <div>
          <button 
            type="submit" 
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :disabled="loading"
          >
            <span v-if="loading">{{ t('auth.sending') }}</span>
            <span v-else>{{ t('auth.login') }}</span>
          </button>
        </div>

        <!-- 分割线 -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-gray-50 text-gray-500">或者</span>
          </div>
        </div>

        <!-- GitHub 登录按钮 -->
        <div>
          <button 
            type="button" 
            @click="handleGithubLogin" 
            class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <img class="h-5 w-5 mr-2" src="~/assets/github-mark.svg" alt="GitHub logo">
            使用 GitHub 登录
          </button>
        </div>

        <!-- 注册链接 -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            {{ t('auth.noAccount') }}
            <NuxtLink to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
              {{ t('auth.registerLink') }}
            </NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)
const error = ref('')
const emailError = ref('')
const passwordError = ref('')

// 表单验证
const validateForm = () => {
  let isValid = true
  error.value = ''
  emailError.value = ''
  passwordError.value = ''

  if (!validateEmail(email.value)) {
    emailError.value = t('auth.errors.invalidEmail')
    isValid = false
  }

  if (!validatePassword(password.value)) {
    passwordError.value = t('auth.errors.invalidPassword')
    isValid = false
  }

  return isValid
}

// 监听输入，实时验证
watch(email, () => {
  if (emailError.value) {
    emailError.value = validateEmail(email.value) ? '' : t('auth.errors.invalidEmail')
  }
})

watch(password, () => {
  if (passwordError.value) {
    passwordError.value = validatePassword(password.value) ? '' : t('auth.errors.invalidPassword')
  }
})

// 处理表单登录
const handleLogin = async () => {
  if (!validateForm()) return

  try {
    loading.value = true
    // TODO: 实现登录逻辑
    const loginData = {
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value
    }
    
    // 模拟登录请求
    // const response = await $fetch('/api/login', {
    //   method: 'POST',
    //   body: loginData
    // })

    // 如果记住我被选中，存储邮箱到 localStorage
    if (rememberMe.value) {
      localStorage.setItem('rememberedEmail', email.value)
    } else {
      localStorage.removeItem('rememberedEmail')
    }

  } catch (err) {
    error.value = t('auth.errors.loginFailed')
  } finally {
    loading.value = false
  }
}

// 页面加载时检查是否有记住的邮箱
onMounted(() => {
  const rememberedEmail = localStorage.getItem('rememberedEmail')
  if (rememberedEmail) {
    email.value = rememberedEmail
    rememberMe.value = true
  }
})

// 处理 GitHub 登录
const handleGithubLogin = async () => {
  try {
    // TODO: 实现 GitHub OAuth 登录逻辑
    console.log('GitHub 登录')
  } catch (error) {
    console.error('GitHub 登录失败：', error)
  }
}

// 设置页面标题
useHead({
  title: computed(() => t('auth.login'))
})
</script> 