<script setup lang="ts">
console.log('chat-index');
</script>

<template>
  <div class="flex-col w-full h-full select-none flex-center bg-gray-50">
    <Icon class="text-gray-100 text-[256px]" name="material-symbols:chat" />

    <div class="text-gray-500">{{ $route.params }}</div>
  </div>
</template>
