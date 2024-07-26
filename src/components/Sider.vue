<script setup lang="ts">
const menus = ref([
  {
    to: '/',
    label: 'Home',
  },

  {
    to: '/chat/13',
    label: 'chat-13',
  },
  {
    to: '/chat/14',
    label: 'chat-14',
  },
]);

const footerMenus = ref([
  {
    to: '/_tailwind/',
    label: '_tailwind/',
    target: '_blank',
  },
]);
</script>

<template>
  <div
    class="flex flex-col bg-gray-700 w-[--sider-width] justify-between text-gray-200"
  >
    <header>
      <h3>header</h3>
      <ul class="flex flex-col items-center justify-center gap-3">
        <li
          v-for="(item, index) in menus"
          :key="item.to"
          class="flex items-center justify-center rounded-lg size-10 bg-slate-500 hover:bg-slate-600"
        >
          <NuxtLink :to="item.to">{{ item.label }}</NuxtLink>
        </li>
      </ul>
    </header>

    <footer>
      <h3>footer</h3>

      <ul class="flex flex-col items-center justify-center gap-3">
        <li
          v-for="(item, index) in footerMenus"
          :key="item.to"
          class="flex items-center justify-center rounded-lg size-10 bg-slate-500 hover:bg-slate-600"
        >
          <a :href="item.to" :target="item.target">{{
            item.label
          }}</a>
        </li>
      </ul>
    </footer>
  </div>
</template>
<style scoped></style>
