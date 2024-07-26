<script setup lang="ts">
const menus = ref([
  {
    to: '/',
    label: 'Home',
  },
  {
    to: '/word',
    label: 'Work',
  },
  {
    to: '/chat',
    label: 'chat',
  },
  {
    to: '/chat/14',
    label: 'chat to:14',
  },
]);
</script>

<template>
  <div>
    <NuxtRouteAnnouncer>
      <template #default="{ message }">
        <p>{{ message }} was loaded.</p>
      </template>
    </NuxtRouteAnnouncer>

    <NuxtLink to="/word">word</NuxtLink>

    <!-- <NuxtWelcome /> -->

    <ul>
      <li v-for="(item, index) in menus" :key="item.to">
        <NuxtLink :to="item.to">{{ item.label }}</NuxtLink>
      </li>
    </ul>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
