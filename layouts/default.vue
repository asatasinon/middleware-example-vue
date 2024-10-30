<script setup lang="ts">
const route = useRoute()

// 不需要显示导航栏的路由路径
const hideNavbarRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password'
]

// 判断当前路由是否需要显示导航栏
const showNavbar = computed(() => {
  return !hideNavbarRoutes.includes(route.path)
})
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- 导航栏 -->
    <AppNavbar v-if="showNavbar" />

    <!-- 页面内容 -->
    <main :class="[showNavbar ? 'max-w-7xl mx-auto py-6 sm:px-6 lg:px-8' : '']">
      <slot />
    </main>
  </div>
</template> 