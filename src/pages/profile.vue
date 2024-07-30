<script lang="ts" setup>
definePageMeta({
  layout: 'chating-layout',
  key: (route) => {
    const key = `${route.fullPath}`;
    // console.log('keepAliveKey', key, route);
    return key;
  },
  // keepAlive: true,
});

const counter = ref(0);
const onClick = () => {
  counter.value++;
};
</script>

<template>
  <div @click="onClick">
    profile
    <h3 class="text-lg">
      <NuxtLink to="/chat/13/16">
        <Icon name="mdi:abjad-arabic"></Icon>

        profile</NuxtLink
      >
    </h3>

    {{ counter }}
  </div>
</template>
