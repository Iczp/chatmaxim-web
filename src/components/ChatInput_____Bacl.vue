<script setup lang="ts">
const tools = ref([
  {
    icon: 'ic:baseline-face',
    label: '表情',
  },
  {
    icon: 'ic:baseline-face',
    label: '表情',
  },
  {
    icon: 'ic:baseline-face',
    label: '表情',
  },
  {
    icon: 'ic:baseline-face',
    label: '表情',
  },
]);
</script>

<template>
  <div class="flex flex-col h-56 border-t">
    <div class="flex flex-row px-2 bg-gray-100">
      <ul class="flex items-center gap-2">
        <li
          v-for="(item, index) in tools"
          :key="index"
          :title="item.label"
          class="flex items-center justify-center size-8 hover:bg-gray-200"
        >
          <Icon :name="item.icon" class="text-xl" />
        </li>
      </ul>
    </div>
    <div class="flex flex-1">
      <textarea
        class="bottom-0 flex flex-1 w-full h-full bg-transparent border-none ring-0 focus:border-0 focus:ring-0"
      >
chat-input.
</textarea
      >
    </div>
    <div class="flex flex-row justify-between h-12 px-4">
      <div class="flex items-center">aaa</div>

      <div class="flex items-center"><button>发送</button></div>
    </div>
  </div>
</template>
