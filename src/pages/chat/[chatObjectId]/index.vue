<script setup lang="ts">
console.log('chat-index');
</script>

<template>
  <div class="flex-col w-full h-full select-none flex-center">
    <Icon
      class="text-gray-100 text-[256px] dark:text-gray-700"
      name="material-symbols:chat"
    />

    <div class="text-gray-500">{{ $route.params }}</div>
  </div>
</template>
