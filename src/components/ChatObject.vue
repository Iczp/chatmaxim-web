<script setup lang="ts">
import { useAttrs, useSlots } from 'vue';
import LayoutItem from './LayoutItem.vue';
import Avatar from './Avatar.vue';
import { type ChatObjectDto } from '../apis/dtos';
import { computed } from 'vue';
import { ServiceStatusEnums } from '../apis/enums';

const slots = useSlots();
const attrs = useAttrs();
// console.log('slots', slots);
// console.log('attrs', attrs);
// const icon = ref(attrs['icon'] || false);
const props = defineProps<{
  entity?: ChatObjectDto;
  size?: number;
  badge?: string | number;
  dot?: boolean | null;
  thumb?: boolean;
  isStatus?: boolean;
}>();

// custom slot
const ignoreSlots = ['header', 'title'];
const inheritanceKeys = Object.keys(slots).filter(x => !ignoreSlots.some(d => d == x));

const displayName = computed(
  () => props.entity?.fullPathName?.replace('/', ':') || props.entity?.name,
);
</script>

<template>
  <layout-item class="chat-object" v-bind="attrs" header>
    <template #header>
      <!-- <a-badge :count="badge" :overflow-count="99"  :dot="dot"> -->
      <avatar
        :entity="entity"
        :size="size"
        :thumb="thumb"
        :is-status="isStatus && Number(entity?.serviceStatus) > 0"
      />
      <!-- </a-badge> -->
    </template>
    <template #title>
      <slot name="title">
        <span class="text-ellipsis">{{ displayName }}</span>
      </slot>
    </template>
    <template v-for="(slot, index) of inheritanceKeys" :key="index" v-slot:[slot]>
      <slot :name="slot"></slot>
    </template>
  </layout-item>
</template>

<style scoped>
/* :deep(.layout-item) {
  --spacing-size: 8px;
} */
/* :deep(.title-left.object-name) {
  max-width: 240px;
} */
.chat-object {
  padding: 6px 0px;
  --spacing-size: 8px;
  --border-left: 0;
  --border-right: 0;
}

.chat-object::after {
  /* content: ''; */
  height: 1px;
  left: var(--border-left);
  right: var(--border-right);
  bottom: 0;
  position: absolute;
  transform: scaleY(0.5);
  overflow: hidden;
  background-color: var(--divider-color);
}
</style>
