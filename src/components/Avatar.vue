<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue';
import type { ChatObjectDto } from '../apis/dtos';
// import { Person, Group, Groups, SmartToy, Services, ShoppingBag } from '../icons';
import { computed, ref, type CSSProperties } from 'vue';
import { ChatObjectTypeEnums, ServiceStatusEnums } from '../apis/enums';
import { formatUrl } from '../utils/utils';
import ServiceStatus from './ServiceStatus.vue';

import { useCssVar } from '@vueuse/core';
const props = withDefaults(
  defineProps<{
    name?: string;
    entity?: ChatObjectDto;
    size?: number | string;
    thumb?: boolean;
    shape?: 'circle' | 'square';
    status?: ServiceStatusEnums | null;
    isStatus?: boolean;
  }>(),
  {
    shape: 'circle',
    size: 44,
  }
);

const avatarRef = ref<HTMLElement | null>();
const avatarSize = useCssVar('--avatar-size', avatarRef, {
  initialValue: `${props.size}px`,
});

const wrapperStyle = ref<CSSProperties>({
  width: `${props.size}px`,
  height: `${props.size}px`,
});

const objectType = computed(() => props.entity?.objectType);
const svgClass = computed(() => 'svg-icon');
// const shape = ref('circle');
// File/831C11D5-A3DF-6943-E20D-3A10F706CCA7

const src = computed(() =>
  formatUrl(
    props.thumb
      ? props.entity?.thumbnail || props.entity?.portrait
      : props.entity?.portrait
  )
);
</script>

<template>
  <div ref="avatarRef" class="bg-gray-600 rounded-lg avatar-wraper size-9">
    <div class="flex-1 text-2xl flex-center avatar-icon">
      <Icon
        v-if="objectType == ChatObjectTypeEnums.Room"
        name="material-symbols:group"
      />
      <Icon
        v-else-if="objectType == ChatObjectTypeEnums.Square"
        name="material-symbols:groups"
      />
      <Icon
        v-else-if="objectType == ChatObjectTypeEnums.Robot"
        name="material-symbols:robot"
      />
      <Icon
        v-else-if="objectType == ChatObjectTypeEnums.Official"
        name="ri:service-fill"
      />
      <Icon
        v-else-if="objectType == ChatObjectTypeEnums.ShopKeeper"
        name="material-symbols:shopping-bag"
      />
      <Icon v-else name="material-symbols:person" />
    </div>

    <sub v-if="isStatus" class="sub-status">
      <ServiceStatus :status="entity?.serviceStatus" />
    </sub>
  </div>
</template>

<style lang="scss" scoped>
:deep(.ant-avatar) {
  font-size: 16px !important;
}
.avatar-wraper {
  display: flex;
  flex-shrink: 0;
  position: relative;
  --avatar-size: 44px;
  width: var(--avatar-size);
  height: var(--avatar-size);
}
.sub-status {
  position: absolute;
  transform: translate(50%, 50%);
  /* 计算135度位置 */
  right: calc(50% - 0.7071 * var(--avatar-size) / 2); /* cos(135°) * radius */
  bottom: calc(50% - 0.7071 * var(--avatar-size) / 2); /* sin(135°) * radius */
}
.avatar {
  display: flex;
  flex-shrink: 0;

  background-color: var(--avatar-background-color);
  color: var(--avatar-color);
  justify-content: center;
  align-items: center;
}
.avatar-icon {
  color: white;
}
</style>
