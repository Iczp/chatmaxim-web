<script lang="ts" setup>
import {
  ref,
  computed,
  type CSSProperties,
  watch,
  watchEffect,
  defineExpose,
} from 'vue';
import { useDraggable } from '@vueuse/core';

import AppAbout from './AppAbout.vue';

import type { TabsProps } from 'ant-design-vue';
const mode = ref<TabsProps['tabPosition']>('left');
const activeKey = ref(1);
const callback: TabsProps['onTabScroll'] = val => {
  console.log(val);
};

const componentConfigs = [
  {
    name: 'about',
    component: AppAbout,
    props: {
      title: 'About',
    },
  },
  {
    name: 'about2',
    component: AppAbout,
    props: {
      title: 'About2',
    },
  },
];

const currentComponent = shallowRef();
// let currentComponent:any = null;
const setComponent = (name: string) => {
  currentComponent.value = componentConfigs.find((item) => item.name === name)!;

  console.log(currentComponent.value);
};

const modalTitleRef = ref<HTMLElement>();
const { x, y, isDragging } = useDraggable(modalTitleRef);

const startX = ref<number>(0);
const startY = ref<number>(0);
const startedDrag = ref(false);
const transformX = ref(0);
const transformY = ref(0);
const preTransformX = ref(0);
const preTransformY = ref(0);
const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });
watch([x, y], () => {
  if (!startedDrag.value) {
    startX.value = x.value;
    startY.value = y.value;
    const bodyRect = document.body.getBoundingClientRect();
    const titleRect = modalTitleRef.value!.getBoundingClientRect();
    dragRect.value.right = bodyRect.width - titleRect.width;
    dragRect.value.bottom = bodyRect.height - titleRect.height;
    preTransformX.value = transformX.value;
    preTransformY.value = transformY.value;
  }
  startedDrag.value = true;
});
watch(isDragging, () => {
  if (!isDragging) {
    startedDrag.value = false;
  }
});

watchEffect(() => {
  if (startedDrag.value) {
    transformX.value =
      preTransformX.value +
      Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
      startX.value;
    transformY.value =
      preTransformY.value +
      Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
      startY.value;
  }
});
const transformStyle = computed<CSSProperties>(() => {
  return {
    transform: `translate(${transformX.value}px, ${transformY.value}px)`,
  };
});
const isOpen = ref<boolean>(false);

const handleOk = (e: MouseEvent) => {
  console.log(e);
  isOpen.value = false;
};
const open = () => {
  isOpen.value = true;
};
const closed = () => {
  isOpen.value = false;
};

const counter = ref<number>(0);
defineExpose({
  open,
  close,
});
</script>

<template>
  <a-modal class="app-setting" v-model:open="isOpen" @ok="handleOk" :closable="false">
    <!-- <div @click="counter++">setting {{ counter }}</div> -->

    <div>
    <!-- <a-radio-group v-model:value="mode" :style="{ marginBottom: '8px' }">
      <a-radio-button value="top">Horizontal</a-radio-button>
      <a-radio-button value="left">Vertical</a-radio-button>
    </a-radio-group> -->
    <a-tabs
      v-model:activeKey="activeKey"
      :tab-position="mode"
      :style="{ height: '360px' }"
      @tabScroll="callback"
    >
      <a-tab-pane v-for="i in 5" :key="i" :tab="`Tab-${i}`">Content of tab {{ i }}</a-tab-pane>
    </a-tabs>
  </div>

    <!-- <template #title>
      <div ref="modalTitleRef" style="width: 100%; cursor: move">
        {{ $t('Setting') }}
      </div>
    </template> -->
    <template #modalRender="{ originVNode }">
      <div :style="transformStyle">
        <component :is="originVNode" />
      </div>
    </template>
    <template #footer></template>
  </a-modal>
</template>

<style scoped>
.app-setting .ant-modal .ant-modal-content {
  padding: 0;
}
</style>
