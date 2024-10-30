<script setup lang="ts">
const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()

const activeMenu = ref('')

// 菜单配置
const menus = [
  {
    name: 'database',
    label: computed(() => t('nav.database')),
    items: [
      { 
        label: computed(() => t('nav.redis')), 
        path: '/database/redis-example'
      },
      { 
        label: computed(() => t('nav.mysql')), 
        path: '/database/mysql-example'
      }
    ]
  },
  {
    name: 'mq',
    label: computed(() => t('nav.messageQueue')),
    items: [
      { 
        label: computed(() => t('nav.kafka')), 
        path: '/mq/kafka-example'
      },
      { 
        label: computed(() => t('nav.rocketmq')), 
        path: '/mq/rocketmq-example'
      }
    ]
  }
]

// 语言选项
const languageOptions = [
  { code: 'zh_cn', name: '简体中文' },
  { code: 'en', name: 'English' }
]

// 处理语言切换
const handleLanguageChange = (event: Event) => {
  const select = event.target as HTMLSelectElement
  const newLocale = select.value
  const path = switchLocalePath(newLocale)
  if (path) {
    navigateTo(path)
  }
}

// 切换菜单显示状态
const toggleMenu = (menuName: string) => {
  activeMenu.value = activeMenu.value === menuName ? '' : menuName
}

// 点击外部关闭下拉菜单
onMounted(() => {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    if (!target.closest('.relative')) {
      activeMenu.value = ''
    }
  })
})

// 移动端菜单控制
const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo 部分 -->
        <div class="flex">
          <NuxtLink :to="localePath('/')" class="flex-shrink-0 flex items-center">
            <span class="text-xl font-bold text-gray-900">{{ t('nav.home') }}</span>
          </NuxtLink>
        </div>

        <!-- 桌面端导航 -->
        <div class="hidden sm:flex sm:items-center sm:space-x-8">
          <!-- 语言选择 -->
          <div class="relative">
            <select
              :value="locale"
              @change="handleLanguageChange"
              class="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option 
                v-for="lang in languageOptions"
                :key="lang.code"
                :value="lang.code"
              >
                {{ lang.name }}
              </option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>

          <!-- 导航菜单 -->
          <div 
            v-for="menu in menus" 
            :key="menu.name"
            class="relative inline-block text-left"
          >
            <button 
              type="button" 
              class="group inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-50 transition-all duration-200" 
              :class="{ 'bg-gray-50 scale-105': activeMenu === menu.name }"
              @click.stop="toggleMenu(menu.name)"
            >
              {{ menu.label }}
              <span 
                class="ml-1 text-gray-400 group-hover:text-gray-500 transition-transform duration-200"
                :class="{ 'transform rotate-90': activeMenu !== menu.name }"
              >▼</span>
            </button>

            <!-- 下拉菜单 -->
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95 -translate-y-2"
              enter-to-class="transform opacity-100 scale-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="transform opacity-100 scale-100 translate-y-0"
              leave-to-class="transform opacity-0 scale-95 -translate-y-2"
            >
              <div 
                v-show="activeMenu === menu.name"
                class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
              >
                <div class="py-1">
                  <NuxtLink
                    v-for="item in menu.items"
                    :key="item.path"
                    :to="localePath(item.path)"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:pl-6"
                    @click.stop="activeMenu = ''"
                  >
                    {{ item.label }}
                  </NuxtLink>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- 移动端菜单按钮 -->
        <div class="flex items-center sm:hidden">
          <button 
            @click="toggleMobileMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <span class="sr-only">打开菜单</span>
            <!-- 汉堡包图标 -->
            <div class="w-6 h-5 relative flex flex-col justify-between">
              <span 
                class="w-full h-0.5 bg-current transition-all duration-300"
                :class="{ 'rotate-45 translate-y-2': isMobileMenuOpen }"
              ></span>
              <span 
                class="w-full h-0.5 bg-current transition-all duration-300"
                :class="{ 'opacity-0': isMobileMenuOpen }"
              ></span>
              <span 
                class="w-full h-0.5 bg-current transition-all duration-300"
                :class="{ '-rotate-45 -translate-y-2': isMobileMenuOpen }"
              ></span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-show="isMobileMenuOpen" class="sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <!-- 移动端语言选择 -->
          <div class="px-4 py-2 border-b border-gray-200">
            <select
              :value="locale"
              @change="handleLanguageChange"
              class="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option 
                v-for="lang in languageOptions"
                :key="lang.code"
                :value="lang.code"
              >
                {{ lang.name }}
              </option>
            </select>
          </div>

          <!-- 导航菜单 -->
          <div v-for="menu in menus" :key="menu.name" class="px-4">
            <div class="text-gray-600 font-medium py-2">
              {{ menu.label }}
            </div>
            <NuxtLink
              v-for="item in menu.items"
              :key="item.path"
              :to="localePath(item.path)"
              class="block pl-8 pr-4 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-md"
              @click="isMobileMenuOpen = false"
            >
              {{ item.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.router-link-active {
  @apply text-indigo-600 bg-gray-50;
}
</style> 