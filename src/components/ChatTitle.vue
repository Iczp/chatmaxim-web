<template>
  <div
    class="flex flex-row justify-between items-center h-[--chat-title-height] border-b shrink-0 p-4"
  >
    <div class="flex flex-row items-center gap-4">
      <slot name="avatar">
        <!-- <Icon name="ic:baseline-arrow-back" class="text-2xl" /> -->
      </slot>

      <div class="flex flex-col">
        <slot name="title">
          <h2 class="text-lg font-bold">IM Chat,id:{{ $route.params }}</h2>
        </slot>

        <slot name="description">
          <div class="text-sm text-gray-400">description</div>
        </slot>
      </div>
    </div>
    <div class="flex items-center">
      <Icon name="ic:baseline-more-horiz" class="text-2xl" />
    </div>
  </div>
</template>
