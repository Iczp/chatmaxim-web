<script setup lang="ts">
import { computed, onActivated, onDeactivated, ref } from 'vue';
import { useRoute } from 'vue-router';
// import { router, chatHistorys } from '../routes';
import { EditOutlined, SettingOutlined } from '@ant-design/icons-vue';
// import SessionItem from '../components/SessionItem.vue';
// import ChatObject from '../components/ChatObject.vue';
// import ServiceStatus from '../components/ServiceStatus.vue';
// import Loading from '../components/Loading.vue';
import { type SessionItemDto } from '../../apis/dtos';
// import { useImStore } from '../stores/imStore';
// import { navToChat as navToChatX } from '../commons/utils';
// import { showContextMenuForSession } from '~/commons/contextmenu';
// import { createRoom } from '../commons/createRoom';
// import { eventBus } from '../commons/eventBus';
// import { useSessionUnitList } from '../commons/useSessionUnitList';
// import { openChildWindow } from '../ipc/openChildWindow';
// import { useI18n } from 'vue-i18n';
// import { Plus } from '../icons';

import ObjectPicker from '../../components/ObjectPicker.vue';


const createRoom = ref<InstanceType<typeof ObjectPicker> | null>(null);

const showContextMenuForSession = () => {};

definePageMeta({
  layout: 'chating-layout',
  key: (route) => {
    const key = `/chat/${route.params.chatObjectId}`;
    // console.log('keepAliveKey', key, route);
    return key;
  },
  keepAlive: true,
  validate: (route) => {
    return Number(route.params.chatObjectId) > 0;
  },
});

const route = useRoute();

const chatObjectId = Number(route.params.chatObjectId);
const sessionUnitItems = ref([]);

const { t } = useI18n();
const props = defineProps<{
  // chatObjectId: number | undefined;
}>();

const store = useImStore();

const scrollerRef = ref();

const {
  list,
  isBof,
  isEof,
  maxMessageId,
  minMessageId,
  refresh,
  fetchLatest,
  fetchHistorical,
  isPendingOfFetchLatest,
  isPendingOfFetchHistorical,
} = useSessionUnitList({ ownerId: Number(chatObjectId) });

const currentChatObject = computed(
  () => store.getChatObject(chatObjectId)?.owner
);

const acitveSessionUnitId = computed(() => route.params.sessionUnitId);

const flashSessionUnitId = ref<string>();

const displayItems = computed<SessionItemDto[]>(() =>
  store
    .searchSessionItems(chatObjectId, keyword.value)
    .filter((x) => !x.isSeparated)
);

const setFlash = (sessionUnitId: string) => {
  flashSessionUnitId.value = sessionUnitId;
  setTimeout(() => {
    flashSessionUnitId.value = undefined;
  }, 1000);
};

const dragend = (item: SessionItemDto) => {
  onItemDbClick(item);
};
const onItemDbClick = (item: SessionItemDto) => {
  item.isSeparated = true;
  // router.push({ name: 'chat-empty' });
  // openChildWindow({
  //   t,
  //   window: {
  //     name: `chat-${item.id}`,
  //     path: `/separate-chat/${item.ownerId}/${item.id}`,
  //     payload: { sessionUnit: store.getSessionUnit(item.id!) },
  //     focus: true,
  //     size: {
  //       width: 480,
  //       height: 640,
  //     },
  //   },
  // }).finally(() => {
  //   console.warn('separate-chat window is closed');
  //   item.isSeparated = false;
  //   setFlash(item.id!);
  // });
};

const onItemClick = (item: SessionItemDto) => {
  const entity = store.getSessionUnit(item.id!);
  console.log('onItemClick', item, entity);
  navToChat({
    chatObjectId: item.ownerId!,
    sessionUnitId: item.id!,
  });
};

const keyword = ref<string>('');

const onSearch = (e: any) => {
  console.log('onSearch', e);
};

const onReachStart = (event: CustomEvent) => {
  console.info('onReachStart');
};
const onReachEnd = (event: CustomEvent) => {
  // const el = event.target as HTMLElement;
  console.info('onReachEnd', displayItems.value.length);

  if (isBof.value) {
    console.warn('onReachEnd isBof', isBof.value);
    return;
  }
  if (isPendingOfFetchHistorical.value) {
    console.warn(
      'onReachEnd isPendingOfFetchHistorical:',
      isPendingOfFetchHistorical.value
    );
    return;
  }
  fetchHistorical('onReachEnd');
};
const footerObserver = ref<HTMLElement | null>();

const onPlus = () => {
  // createRoom({
  //   t,
  //   title: t('CreateRoom'),
  //   chatObjectId: props.chatObjectId!,
  // });
  console.log('onPlus');

  
};

let fetchLatestTimer: NodeJS.Timeout | undefined;
const init = () => {
  if (fetchLatestTimer) {
    clearTimeout(fetchLatestTimer);
  }
  fetchLatest({
    caller: 'onActivated',
  }).catch((err) => {
    // fetchLatestTimer = setTimeout(init, 1000 * 10);
  });
};
onActivated(() => {
  console.log('scrollerRef', scrollerRef.value?.scrollToItem);
  setTimeout(() => {
    console.log('scroll to item');
    scrollerRef.value.scrollToPosition(0);
  }, 0);
  init();
  // fetchHistorical().then(res => {});
  // eventBus.on('connected', refresh);
});

onDeactivated(() => {
  // eventBus.off('disconnected', refresh);
});
</script>

<template>
  <main class="flex flex-row h-full">
    <aside class="border-r nav-side">
      <header class="nav-side-header">
        <div class="current-chat-object">
          <ChatObject :entity="currentChatObject">
            <template #sub>
              <ServiceStatus
                :status="currentChatObject?.serviceStatus"
                :is-text="true"
              >
                <span>在线</span>
              </ServiceStatus>
            </template>
          </ChatObject>
          <a-space direction="horizontal" :size="12" split="|">
            <EditOutlined key="edit" />
            <!-- <SettingOutlined key="edit" /> -->
            <Plus @click="onPlus" class="cursor-pointer svg-icon" />
          </a-space>
        </div>
        <div class="search-bar">
          <!-- <a-space direction="vertical"> -->
          <a-input
            v-model:value="keyword"
            :bordered="true"
            :allowClear="true"
            :placeholder="`${t('Search')}:${minMessageId}`"
            style="width: 100%"
          >
            <!-- <template #addonAfter>
              <div class="plus-label">
                <Plus @click="onPlus" class="cursor-pointer svg-icon" />
              </div>
            </template> -->
          </a-input>
          <!-- </a-space> -->
        </div>
      </header>

      <!-- <div class="session-list"></div> -->
      <RecycleScroller
        ref="scrollerRef"
        class="scroller"
        :items="displayItems"
        :item-size="64"
        key-field="id"
        @scroll-start="onReachStart"
        @scroll-end="onReachEnd"
      >
        <template #before>
          <Loading
            v-if="isPendingOfFetchLatest && displayItems.length == 0"
            :height="24"
            :text="t('message.receiving')"
          ></Loading>
        </template>
        <template #after>
          <Loading
            v-if="isPendingOfFetchHistorical"
            :text="t('loading')"
          ></Loading>
        </template>
        <template
          v-slot="{ item, index }: { item: SessionItemDto, index: number }"
        >
          <SessionItem
            :id="item.id"
            :index="index"
            :active="acitveSessionUnitId == item.id"
            :flash="flashSessionUnitId == item.id"
            @click.native="onItemClick(item)"
            @dragend="dragend(item)"
            @contextmenu="showContextMenuForSession"
          />
        </template>
      </RecycleScroller>
    </aside>

    <main class="flex flex-col flex-1">
      <!-- <router-view></router-view> -->
      <!-- <router-view v-slot="{ Component, route }">
        <keep-alive :max="10">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </router-view> -->
      <NuxtPage :keepalive="{ max: 10 }">
        <template #model>
          <div>Model</div>
        </template>
      </NuxtPage>
    </main>
  </main>
</template>

<style scoped>
:deep(.ant-input:focus),
:deep(.ant-input:hover),
:deep(.ant-input-focused),
.ant-input:focus,
.ant-input:hover,
.ant-input-focused {
  /* border-color: #4096ff; */
  box-shadow: none;
  border-inline-end-width: 1px;
  outline: 0;
  border: none;
}

.scroller::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  /* padding: 10px; */
  transition: all 0.3s linear;
  background: transparent;
  /* display: none; */
  /* position: absolute; */
}

.scroller::-webkit-scrollbar-track {
  border-radius: 6px;
  background: rgba(169, 169, 169, 0);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
  display: none;
}
/* 滚动条滑块 */
.scroller::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background: rgba(212, 212, 212, 0);
  -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0);
  transition: all 0.3s linear;
  /* display: none; */
}
.scroller:hover::-webkit-scrollbar {
  display: unset;
}
.scroller:hover::-webkit-scrollbar-track {
  display: unset;
}
.scroller:hover::-webkit-scrollbar-thumb {
  background: rgba(163, 163, 163, 0.232);
}

.page-session {
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
.nav-side {
  display: flex;
  flex-direction: column;
  width: 280px;
  /* background-color: rgba(139, 139, 139, 0.097); */
  border-right: 1px solid var(--sider-border-color);
  flex-shrink: 0;
  background-color: var(--sider-background-color);
}
.nav-side-header {
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-bottom: 1px solid var(--divider-color);
  padding: 12px;
}
.current-chat-object {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.search-bar {
  display: flex;

  /* height: 64px; */
  flex-shrink: 0;
  justify-content: center;
  align-items: center;

  /* width: 100%; */
}
.search-bar:deep(.ant-input-group-addon) {
  /* width: 32px; */
  padding: 0;
}
.plus-label {
  /* color: var(--color); */
  width: 32px;
}
.session-scroll-view {
  display: flex;
  flex: 1;
}

.content {
  display: flex;
  flex: 1;
  width: 100%;
}
.session-list {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
