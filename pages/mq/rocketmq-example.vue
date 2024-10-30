<template>
  <div class="bg-white shadow rounded-lg p-6">
    <h2 class="text-2xl font-bold mb-4">RocketMQ 示例</h2>
    <div class="grid grid-cols-2 gap-4">
      <!-- Producer -->
      <div class="border rounded p-4">
        <h3 class="text-lg font-semibold mb-2">生产者</h3>
        <div class="space-y-2">
          <input 
            type="text" 
            v-model="topic" 
            placeholder="Topic"
            class="w-full border rounded px-3 py-2"
          >
          <textarea 
            v-model="message" 
            placeholder="消息内容"
            class="w-full border rounded px-3 py-2 h-32"
          ></textarea>
          <div class="flex space-x-2">
            <button 
              @click="handleSend('normal')" 
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              普通消息
            </button>
            <button 
              @click="handleSend('delay')" 
              class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              延时消息
            </button>
          </div>
        </div>
      </div>
      
      <!-- Consumer -->
      <div class="border rounded p-4">
        <h3 class="text-lg font-semibold mb-2">消费者</h3>
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <span>消息列表</span>
            <button 
              @click="startConsume" 
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              开始监听
            </button>
          </div>
          <div class="border rounded p-2 h-48 overflow-auto">
            <div v-for="(msg, index) in messages" :key="index" class="p-2 border-b">
              {{ msg }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const topic = ref('')
const message = ref('')
const messages = ref<string[]>([])

const handleSend = async (type: 'normal' | 'delay') => {
  try {
    // TODO: 实现 RocketMQ 发送消息
    messages.value.push(`发送${type === 'delay' ? '延时' : '普通'}消息到 ${topic.value}: ${message.value}`)
    message.value = ''
  } catch (err: any) {
    console.error(err.message)
  }
}

const startConsume = async () => {
  try {
    // TODO: 实现 RocketMQ 消费消息
    messages.value.push(`开始监听 ${topic.value}`)
  } catch (err: any) {
    console.error(err.message)
  }
}
</script> 