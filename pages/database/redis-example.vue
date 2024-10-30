<template>
  <div class="bg-white shadow rounded-lg p-6">
    <h2 class="text-2xl font-bold mb-4">{{ t('database.redis.title') }}</h2>
    <div class="space-y-4">
      <!-- String 操作 -->
      <div class="border rounded p-4">
        <h3 class="text-lg font-semibold mb-2">{{ t('database.redis.stringOps') }}</h3>
        <div class="flex space-x-4">
          <input 
            type="text" 
            v-model="key" 
            :placeholder="t('database.redis.key')"
            class="border rounded px-3 py-2"
          >
          <input 
            type="text" 
            v-model="value" 
            :placeholder="t('database.redis.value')"
            class="border rounded px-3 py-2"
          >
          <button 
            @click="handleSet" 
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {{ t('database.redis.set') }}
          </button>
          <button 
            @click="handleGet" 
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {{ t('database.redis.get') }}
          </button>
          <button 
            @click="handleDelete" 
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            {{ t('database.redis.delete') }}
          </button>
        </div>
      </div>
      
      <!-- List 操作 -->
      <div class="border rounded p-4">
        <h3 class="text-lg font-semibold mb-2">{{ t('database.redis.listOps') }}</h3>
        <div class="flex space-x-4">
          <input 
            type="text" 
            v-model="listKey" 
            :placeholder="t('database.redis.key')"
            class="border rounded px-3 py-2"
          >
          <input 
            type="text" 
            v-model="listValue" 
            :placeholder="t('database.redis.value')"
            class="border rounded px-3 py-2"
          >
          <button 
            @click="handleLPush" 
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {{ t('database.redis.lpush') }}
          </button>
          <button 
            @click="handleRPush" 
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {{ t('database.redis.rpush') }}
          </button>
          <button 
            @click="handleRange" 
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {{ t('database.redis.range') }}
          </button>
        </div>
      </div>
      
      <!-- 结果显示 -->
      <div class="border rounded p-4">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-lg font-semibold">{{ t('database.redis.result') }}</h3>
          <button 
            @click="clearResult" 
            class="text-sm text-gray-500 hover:text-gray-700"
          >
            {{ t('database.redis.clear') }}
          </button>
        </div>
        <pre class="bg-gray-100 p-4 rounded">{{ result }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

// String 操作状态
const key = ref('')
const value = ref('')
const result = ref('')

// List 操作状态
const listKey = ref('')
const listValue = ref('')

// 清除结果
const clearResult = () => {
  result.value = ''
}

// String 操作
const handleSet = async () => {
  if (!key.value) {
    result.value = t('database.redis.errors.keyRequired')
    return
  }
  if (!value.value) {
    result.value = t('database.redis.errors.valueRequired')
    return
  }

  try {
    // TODO: 实现 Redis set 操作
    // const response = await $fetch('/api/redis/string/set', {
    //   method: 'POST',
    //   body: { key: key.value, value: value.value }
    // })
    
    result.value = `${t('database.redis.set')}: ${key.value} = ${value.value}`
    value.value = '' // 清空值，保留键以便后续操作
  } catch (err: any) {
    result.value = `${t('database.redis.errors.operationFailed')}: ${err.message}`
  }
}

const handleGet = async () => {
  if (!key.value) {
    result.value = t('database.redis.errors.keyRequired')
    return
  }

  try {
    // TODO: 实现 Redis get 操作
    // const response = await $fetch(`/api/redis/string/get/${key.value}`)
    
    result.value = `${t('database.redis.get')}: ${key.value} = ${value.value || '(模拟值)'}`
  } catch (err: any) {
    result.value = `${t('database.redis.errors.operationFailed')}: ${err.message}`
  }
}

const handleDelete = async () => {
  if (!key.value) {
    result.value = t('database.redis.errors.keyRequired')
    return
  }

  try {
    // TODO: 实现 Redis del 操作
    // const response = await $fetch(`/api/redis/string/del/${key.value}`, {
    //   method: 'DELETE'
    // })
    
    result.value = `${t('database.redis.delete')}: ${key.value}`
    value.value = '' // 清空值
  } catch (err: any) {
    result.value = `${t('database.redis.errors.operationFailed')}: ${err.message}`
  }
}

// List 操作
const handleLPush = async () => {
  if (!listKey.value || !listValue.value) {
    result.value = t('database.redis.errors.valueRequired')
    return
  }

  try {
    // TODO: 实现 Redis lpush 操作
    result.value = `${t('database.redis.lpush')}: ${listKey.value} <- ${listValue.value}`
    listValue.value = '' // 清空值，保留键以便后续操作
  } catch (err: any) {
    result.value = `${t('database.redis.errors.operationFailed')}: ${err.message}`
  }
}

const handleRPush = async () => {
  if (!listKey.value || !listValue.value) {
    result.value = t('database.redis.errors.valueRequired')
    return
  }

  try {
    // TODO: 实现 Redis rpush 操作
    result.value = `${t('database.redis.rpush')}: ${listKey.value} -> ${listValue.value}`
    listValue.value = '' // 清空值，保留键以便后续操作
  } catch (err: any) {
    result.value = `${t('database.redis.errors.operationFailed')}: ${err.message}`
  }
}

const handleRange = async () => {
  if (!listKey.value) {
    result.value = t('database.redis.errors.keyRequired')
    return
  }

  try {
    // TODO: 实现 Redis lrange 操作
    result.value = `${t('database.redis.range')}: ${listKey.value} = [模拟列表数据]`
  } catch (err: any) {
    result.value = `${t('database.redis.errors.operationFailed')}: ${err.message}`
  }
}

// 设置页面标题
useHead({
  title: computed(() => t('database.redis.title'))
})
</script> 