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
    badge: 6,
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
</script>

<template>
  <div
    class="flex flex-col bg-gray-900 w-[--sider-width] justify-between text-gray-100 py-4"
  >
    <header>
      <!-- <h3>header</h3> -->
      <ul class="flex flex-col items-center justify-center">
        <li
          v-for="(item, index) in menus"
          :key="item.to"
          class="flex items-center justify-center size-16"
          :class="{
            active: item.chatObjectId == $route.params.chatObjectId,
            divider: index === 0,
          }"
        >
          <NuxtLink
            :to="item.to"
            :target="item.target"
            class="relative flex items-center justify-center rounded-lg size-10 hover:bg-gray-600"
            :title="item.label"
          >
            <Badge
              v-if="item.badge || index == 1"
              :count="item.badge"
              :dot="index == 1"
            />
            <Icon v-if="item.icon" :name="item.icon" class="text-2xl" />
            <!-- {{ item.label }} -->
          </NuxtLink>
        </li>
      </ul>
    </header>

    <footer>
      <!-- <h3>footer</h3> -->

      <ul class="flex flex-col items-center justify-center gap-4">
        <li
          v-for="(item, index) in footerMenus"
          :key="item.to"
          class="relative flex items-center justify-center"
        >
          <NuxtLink
            :to="item.to"
            :target="item.target"
            class="flex items-center justify-center rounded-lg size-10 hover:bg-gray-600"
            :title="item.label"
          >
            <Icon v-if="item.icon" :name="item.icon" class="text-2xl" />
            <!-- {{ item.label }} -->
          </NuxtLink>
        </li>
      </ul>
    </footer>
  </div>
</template>
<style scoped>
.divider {
  /* @apply after:bg-gray-800 after:w-full flex-col flex  after:content-[''] after:h-[1px] after:size-4 ; */
}
/* .divider::after {
  display: flex;
  content: '';
  height: 1px;
  width: 80%;
} */
.active {
  @apply bg-gray-800;
}
.active a {
  @apply bg-sky-600;
}
</style>
