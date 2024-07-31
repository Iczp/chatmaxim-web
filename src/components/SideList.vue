<script setup lang="ts">
const props = defineProps<{
  items: any[];
  // badge?: number | string;
  // dot?: boolean;
  active?: boolean;
}>();

const emit = defineEmits(['item-click']);
const onItemClick = (item: any) => {
  emit('item-click', item);
};
</script>

<template>
  <ul class="flex flex-col items-center justify-center">
    <li
      v-for="(item, index) in items"
      :key="item.to"
      class="flex items-center justify-center size-16"
      :class="{
        active: item.chatObjectId == $route.params.chatObjectId,
        divider: index === 0,
      }"
    >
      <a-badge :count="item.badge" :dot="item.dot">
        <NuxtLink
          :to="item.to"
          :target="item.target"
          class="relative flex items-center justify-center bg-gray-800 rounded-md size-9 hover:bg-gray-700 hover:ring-gray-500 hover:ring-1 hover:rounded-md"
          :title="item.label"
          @click="onItemClick(item)"
        >
          <Icon v-if="item.icon" :name="item.icon" class="text-2xl" />
          <!-- {{ item.label }} -->
        </NuxtLink>
      </a-badge>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.active {
  @apply bg-gray-800;
}
.active a {
  @apply bg-sky-600;
}
</style>
