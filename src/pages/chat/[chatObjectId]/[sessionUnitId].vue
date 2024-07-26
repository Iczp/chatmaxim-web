<script lang="ts" setup></script>

<template>
  <div class="flex flex-col justify-between h-full">
    <div class="flex flex-col flex-1">
      <div class="flex flex-row items-center h-16 border-b">
        <h2 class="text-lg">IM Chat,id:{{ $route.params }}</h2>
      </div>

      <div>
        <ul>
          <li v-for="item in 20">message-item</li>
        </ul>
      </div>
    </div>

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
  </div>
</template>
