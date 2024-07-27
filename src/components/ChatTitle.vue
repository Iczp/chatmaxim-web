<template>
  <div
    class="flex flex-row justify-between items-center h-[--chat-title-height] border-b shrink-0 p-4 gap-4"
  >
    <div class="flex flex-row items-center gap-4">
      <slot name="avatar">
        <!-- <Icon name="ic:baseline-arrow-back" class="text-2xl" /> -->
      </slot>

      <div
        class="flex flex-col flex-1 min-w-0 min-h-0 max-w-[160px] sm:max-w-full w-full"
      >
        <slot name="title">
          <h2 class="text-lg font-bold truncate">
            IM Chat,id:{{ $route.params }}
          </h2>
        </slot>

        <slot name="description">
          <div class="text-sm text-gray-400 truncate">description</div>
        </slot>
      </div>
    </div>
    <div class="flex items-center">
      <Icon name="ic:baseline-more-horiz" class="text-2xl" />
    </div>
  </div>
</template>
