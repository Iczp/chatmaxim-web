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

const currentComponent = ref();

const setComponent = (name: string) => {
  currentComponent.value = componentConfigs.find((item) => item.name === name)!;

  console.log(currentComponent);
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
  <a-modal class="app-setting" v-model:open="isOpen" @ok="handleOk">
    <!-- <div @click="counter++">setting {{ counter }}</div> -->

    <div class="flex flex-row flex-1">
      <div class="flex flex-col flex-shrink-0 w-24 bg-gray-100">
        <ul>
          <li
            v-for="(item, index) in componentConfigs"
            :key="item.name"
            @click="setComponent(item.name)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="flex flex-col flex-1">
        <component v-if="currentComponent"
          :is="currentComponent.component"
          v-bind="currentComponent.props"
        />
      </div>
    </div>

    <template #title>
      <div ref="modalTitleRef" style="width: 100%; cursor: move">
        Draggable Modal
      </div>
    </template>
    <template #modalRender="{ originVNode }">
      <div :style="transformStyle">
        <component :is="originVNode" />
      </div>
    </template>
  </a-modal>
</template>

<style scoped>
.app-setting .ant-modal .ant-modal-content {
  padding: 0;
}
</style>
