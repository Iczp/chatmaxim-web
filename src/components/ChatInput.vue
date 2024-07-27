<template>
  <div class="flex flex-col h-48 border-t">
    <div class="flex flex-row h-12">
      <ul class="flex items-center">
        <li v-for="i in 5" class="flex items-center justify-center size-6">
          {{ i }}
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
