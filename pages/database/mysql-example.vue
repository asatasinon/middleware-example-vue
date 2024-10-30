<template>
  <div class="bg-white shadow rounded-lg p-6">
    <h2 class="text-2xl font-bold mb-4">MySQL 示例</h2>
    <div class="space-y-4">
      <div class="border rounded p-4">
        <h3 class="text-lg font-semibold mb-2">查询操作</h3>
        <div class="space-y-2">
          <textarea 
            v-model="sql" 
            placeholder="输入 SQL 语句"
            class="w-full border rounded px-3 py-2 h-32"
          ></textarea>
          <button 
            @click="handleQuery" 
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            执行查询
          </button>
        </div>
      </div>
      
      <div class="border rounded p-4">
        <h3 class="text-lg font-semibold mb-2">结果</h3>
        <pre class="bg-gray-100 p-4 rounded overflow-auto max-h-96">{{ result }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const sql = ref('')
const result = ref('')

const handleQuery = async () => {
  try {
    // TODO: 实现 MySQL 查询操作
    result.value = `执行 SQL: ${sql.value}\n结果: [示例数据]`
  } catch (err: any) {
    result.value = `错误: ${err.message}`
  }
}
</script> 