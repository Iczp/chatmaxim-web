<script setup lang="ts">
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
  },
  {
    to: '/_tailwind/',
    label: '_tailwind/',
    target: '_blank',
    icon: 'ic:baseline-settings',
  },
]);

const onItemClick = (item: any) => {
  console.log('onItemClick', item);
  item.click && item.click(item);
};
</script>

<template>
  <div
    class="aside flex flex-col bg-gray-900 w-[--sider-width] justify-between text-gray-100 py-4"
  >
    <header>
      <SideList :items="menus" @item-click="onItemClick"></SideList>
    </header>

    <footer>
      <SideList :items="footerMenus" @item-click="onItemClick"></SideList>
    </footer>
  </div>
</template>
<style lang="scss" scoped></style>
