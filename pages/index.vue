<template>
  <div class="py-12">
    <!-- 欢迎区域 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span class="block">{{ t('home.title') }}</span>
          <span class="block text-indigo-600 mt-2">{{ t('home.subtitle') }}</span>
        </h1>
        <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          {{ t('home.description') }}
        </p>
      </div>

      <!-- 功能卡片区域 -->
      <div class="mt-16">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <!-- 数据库卡片 -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="ml-5">
                  <h3 class="text-lg font-medium text-gray-900">{{ t('home.database.title') }}</h3>
                  <p class="mt-2 text-sm text-gray-500">
                    {{ t('home.database.description') }}
                  </p>
                </div>
              </div>
              <div class="mt-6 grid grid-cols-2 gap-4">
                <NuxtLink 
                  :to="localePath('/database/redis-example')"
                  class="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  {{ t('nav.redis') }}
                </NuxtLink>
                <NuxtLink 
                  to="/database/mysql-example"
                  class="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  {{ t('nav.mysql') }}
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- 消息队列卡片 -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="ml-5">
                  <h3 class="text-lg font-medium text-gray-900">{{ t('home.messageQueue.title') }}</h3>
                  <p class="mt-2 text-sm text-gray-500">
                    {{ t('home.messageQueue.description') }}
                  </p>
                </div>
              </div>
              <div class="mt-6 grid grid-cols-2 gap-4">
                <NuxtLink 
                  to="/mq/kafka-example"
                  class="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  {{ t('nav.kafka') }}
                </NuxtLink>
                <NuxtLink 
                  to="/mq/rocketmq-example"
                  class="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  {{ t('nav.rocketmq') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- GitHub 链接 -->
      <div class="mt-8 text-center">
        <a 
          href="https://github.com/yourusername/your-repo" 
          target="_blank"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          {{ t('home.viewOnGithub') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()  // 使用 Nuxt 提供的 useLocalePath

// 页面标题
useHead({
  title: computed(() => t('home.title'))
})
</script> 