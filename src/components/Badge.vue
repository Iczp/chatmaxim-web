<script setup lang="ts">
withDefaults(
  defineProps<{
    count?: number | string;
    max: number;
    sup?: boolean;
    dot?: boolean;
  }>(),
  {
    max: 99,
    sup: true,
  }
);
</script>

<template>
  <div
    class="flex items-center justify-center text-sm text-white bg-red-600 border rounded-full bg-opacity-80 border-opacity-80"
    :class="{ sup: true, dot, badge: !dot }"
  >
    <slot v-if="!dot">{{ Number(count) > max ? `${max}+` : count }}</slot>
  </div>
</template>

<style scoped>
.sup {
  @apply absolute right-0 translate-x-1/2 -translate-y-1/2 top-0;
}
.dot {
  @apply size-2 shadow-md shadow-red-500;
}
.badge {
  @apply min-w-5;
}
</style>
