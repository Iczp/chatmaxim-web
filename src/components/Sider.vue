<script setup lang="ts">
import { useWebSocketKit } from '../apis/websockets/useWebSocketKit';
import { type BadgeDto } from '../apis/dtos';

import AppSettingModal from './AppSettingModal.vue';
const { t } = useI18n();
const route = useRoute();

const { badge, badgeItems, refresh } = useBadges();

const appSettingRef = ref<InstanceType<typeof AppSettingModal> | null>();

useWebSocketKit({
  onConnected(ws) {
    refresh();
  },
});

const menus = ref([
  {
    to: '/',
    label: 'Home',
    icon: 'ic:sharp-home',
  },
  {
    to: '/chat/13/25',
    label: 'chat-13',
    icon: 'ic:round-chat',
    chatObjectId: '13',
  },
  {
    to: '/chat/14/80',
    label: 'chat-14',
    icon: 'ic:round-chat',
    chatObjectId: '14',
    badge: 66,
    click: (item: any) => {
      item.badge = (Number(item.badge) || 0) + 1;
      navigateTo(item.to);
    },
  },
  {
    to: '/login',
    label: 'login',
    icon: 'ic:sharp-person',
    click: ({ item }: any) => {
      console.log('item.to', item.to);

      navigateTo(item.to);
    },
  },
  {
    to: 'https://icones.js.org/collection/all',
    label: 'icon',
    target: '_blank',
    icon: 'ic:baseline-face',
    click: (item: any) => {
      return false;
    },
  },
]);

const footerMenus = ref([
  {
    to: '/profile',
    label: 'profile',
    icon: 'ic:sharp-person',
    dot: true,
    click: ({ item }: { item: any }) => {
      navigateTo(item.to);
    },
  },
  {
    to: '/_tailwind/',
    label: '_tailwind/',
    target: '_blank',
    icon: 'ic:baseline-settings',
    click: ({ item }: { item: any }) => {
      console.log('item', item);
      appSettingRef.value?.open();
    },
  },
]);

const isChatActive = (chatObjectId: number): boolean => {
  return (
    route.path.startsWith('/chat/') &&
    chatObjectId == Number(route.params.chatObjectId)
  );
};

const navToChatHitory = (item: BadgeDto) => {
  const chatObjectId = item.chatObjectId!;
  // const arg = chatHistorys[chatObjectId];
  // if (arg) {
  //   navToChat({
  //     chatObjectId,
  //     sessionUnitId: arg.sessionUnitId,
  //     title: arg.title,
  //   });
  //   return;
  // }
  // router.push({
  //   path: `/chat/${item.chatObjectId}`,
  // });
};

const activeId = ref<string | undefined>();

const onItemClick = (args: { item: any; event: MouseEvent }) => {
  console.log('onItemClick', args);
  args.item.click && args.item.click(args);
};
</script>

<template>
  <aside
    class="aside flex flex-col bg-gray-900 w-[--sider-width] justify-between text-gray-100 py-4"
  >
    <AppSettingModal ref="appSettingRef" />
    <header>
      <OwnerList />

      <SideList :items="menus" @item-click="onItemClick"></SideList>
    </header>

    <footer>
      <SideList :items="footerMenus" @item-click="onItemClick"></SideList>
    </footer>
  </aside>
</template>
<style lang="scss" scoped></style>
