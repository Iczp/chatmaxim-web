<script setup lang="ts">
import { watch } from 'vue';
import { type SessionUnitOwnerDto } from '../apis';

import { HeartTwoTone, HeartFilled } from '@ant-design/icons-vue';

import { ChatObjectTypeEnums } from '../apis/enums';
import ChatObject from '../components/ChatObject.vue';
import MessageProview from './MessageProview.vue';
import {
  useSessionUnitId,
  useComputedSessionUnit,
} from '../composables/useSessionUnit';
// import { useImStore } from '../stores/imStore';
import { env } from '../env';
import { useI18n } from 'vue-i18n';
import { toRaw } from 'vue';
import { computed } from 'vue';
const { t } = useI18n();
const props = defineProps<{
  // title?: string;
  active?: boolean;
  flash?: boolean;
  entity?: SessionUnitOwnerDto;
  id?: string;
  index?: number;
}>();
const emits = defineEmits<{
  contextmenu: [
    {
      t: any;
      event: MouseEvent | PointerEvent;
      entity?: SessionUnitOwnerDto;
    }
  ];
}>();
const store = useImStore();

const entity = computed(() => store.getSessionUnit(props.id!));

// watch(
//   () => entity.value?.setting?.isImmersed,
//   v => {
//     console.log('watch isImmersed:', v, entity.value?.id, props.index);
//   },
// );

// const lastMessage = computed(() => store.getItem(entity?.id!).lastMessage);
const {
  followingCount,
  isTopping,
  lastMessage,
  isImmersed,
  destination,
  objectType,
  sendTime,
  badge,
  destinationName,
  isShowSender,
  senderName,
  remindCount,
  displaySenderName,
} = useComputedSessionUnit(entity);
// const isTopping = computed(() => Number(entity?.sorting) > 0);

const ondragstart = (event: DragEvent) => {
  // event.preventDefault()

  event.dataTransfer?.setData(
    'text',
    `${env.url_scheme}://to/${entity.value?.id}/${entity.value?.ownerId}`
  );
  console.log('ondragstart', event);
};

const onItemClick = (event: MouseEvent | PointerEvent) => {
  console.log('onItemClick', props.id, toRaw(entity));

  emits('contextmenu', { t, entity: entity.value, event });
};
</script>

<template>
  <chat-object
    :entity="destination"
    class="h-16 session-item"
    draggable="true"
    @dragstart="ondragstart"
    :badge="badge"
    :dot="isImmersed"
    :class="{ active, flash }"
    :object-type="objectType?.toString()"
    :size="44"
    @click.right.native="onItemClick"
    sub
    sub-right
    title-right
    thumb
    :is-status="true"
  >
    <template #title>
      <div class="object-name" :title="destinationName!">
        <span v-if="env.isDev">{{ entity?.ownerId }}-</span>
        <span class="text-ellipsis">{{ destinationName }}</span>
        <a-tag
          v-if="objectType == ChatObjectTypeEnums.Robot"
          color="blue"
          class="object-type-tag"
        >
          {{ t('ObjectType:Robot') }}
        </a-tag>
      </div>
    </template>

    <template #title-right>
      <div class="sendtime">
        <span class="text-ellipsis">{{ sendTime }}</span>
      </div>
    </template>

    <template #sub>
      <div class="text-ellipsis">
        <!-- @我 -->
        <span v-if="remindCount > 0" class="remind">
          {{ Number(remindCount) > 99 ? '99+' : remindCount }}@{{ t('Me') }}
        </span>
        <span
          v-if="followingCount > 0"
          class="following"
          :title="followingCount.toString()"
        >
          <HeartFilled />
          <!-- {{followingCount}} -->
        </span>
        <!-- 我关注的 flowing -->
        <!-- 发送人信息 -->
        <span v-if="isShowSender" class="sender">{{ displaySenderName }}</span>
        <message-proview :entity="lastMessage" />
      </div>
    </template>
    <template #sub-right>
      <a-space class="sub-right">
        <!-- <icon v-if="isImmersed" type="mute" size="14" class="mute" />
        <heart-two-tone v-if="isTopping" two-tone-color="#eb2f96" /> -->
        <a-badge
          v-if="badge != 0"
          :count="badge"
          :overflow-count="99"
          :dot="isImmersed"
          :title="badge?.toString()"
          class="badge"
        />
      </a-space>
    </template>
  </chat-object>
</template>

<style scoped>
/* @import url(../style/message.css); */
:deep(.title-container) {
  height: 24px;
}
:deep(.sub-container) {
  height: 22px;
}
:deep(.sub-left) {
  color: #ccc;
}
.session-item {
  --spacing-size: 12px;
  --title-left-max-width: 112px;
  --sub-left-max-width: 148px;
  --border-left: 68px;
  height: var(--side-width);
  position: relative;
  padding: 0 var(--spacing-size);
  box-sizing: border-box;
  align-items: center;
  flex-shrink: 0;
  cursor: default;
  user-select: none;
  transition: all 0.3s;
}

.session-item::after {
  content: '';
  height: 1px;
  left: 68px;
  right: 0px;
  bottom: 0;
  position: absolute;
  transform: scaleY(0.5);
  overflow: hidden;
  background-color: var(--divider-color);
}
.session-item:last-child::after {
  /* display: none; */
  /* background-color: rgba(242, 20, 20, 0.41); */
}
.session-item::before {
  /* display: none; */
  content: '';
  left: 0;
  height: 0;
  position: absolute;
  width: 3px;
  border-radius: 1px;
  /* height: 100%; */
  background-color: rgba(24, 144, 255, 0.1);
  transition: all 0.3s;
  pointer-events: none;
}
.session-item.active::before,
.session-item.active .active-bar {
  display: block;
  height: 100%;
  background-color: rgba(24, 144, 255, 1);
  z-index: 1;
}

.session-item.active {
  /* background-color: rgba(255, 255, 255, 1); */
  /* background: linear-gradient(135deg, #79b4eb, #97d79c) border-box; */
  /* background: linear-gradient(135deg, #ddefff, #e9ffeb) border-box; */
  background: linear-gradient(135deg, #1a1d1f, #313e32) border-box;
  background: var(--session-item-active-background);
}
.session-item.active:hover {
  background-color: rgba(255, 255, 255, 1);
}
.session-item:active {
  background-color: rgba(26, 144, 255, 0.3);
}
.session-item:hover {
  background-color: var(--session-item-background-color-hover);
}

.object-name {
  display: flex;
  max-width: 112px;
  font-weight: 500;
  align-items: center;
  flex: 1;
}
.object-type-tag {
  font-size: 10px;
  margin: 0 2px;
  padding: 2px;
  line-height: 100%;
  height: 16px;
  display: flex;
  box-sizing: border-box;
  border-radius: 4px;
}
.session-item.active .sendtime {
  color: var(--session-item-active-sendtime-color);
}
.session-item:hover .sendtime {
  color: var(--session-item-hover-sendtime-color);
}
.sendtime {
  display: flex;
  max-width: 120px;
  color: var(--session-item-sendtime-color);
  font-size: 12px;
}

.remind {
  display: inline-flex;
  color: white;
  background: #ff4d4f;
  border-radius: 4px;
  padding: 0 4px;
  box-shadow: 0 0 0 1px #ffffff;
  margin-right: 4px;
  /* font-size: 12px; */
}
.following {
  display: inline-flex;
  align-items: center;
  color: white;
  background: #ff4d4f;
  border-radius: 4px;
  padding: 2px 4px;
  margin-right: 4px;
}
.mute {
  color: var(--mute-color);
}
.sub-right :deep(.ant-space-item) {
  display: flex;
}
.badge :deep(.ant-badge-count) {
  --badge-size: 16px;
  /* font-size: 12px;
  height: var(--badge-size);
  line-height: var(--badge-size);
  min-width: var(--badge-size); */
}
.sender {
  color: var(--session-item-sender-color);
}
.sender::after {
  content: ':';
  color: var(--session-item-sender-after-color);
  margin: 0 2px;
}

.flash {
  animation: flash 0.5s infinite;
}

@keyframes flash {
  from {
    background: rgba(255, 0, 0, 0.637);
  }
  to {
    background: rgba(255, 0, 0, 0);
  }
}
</style>

