<script setup lang="ts">

definePageMeta({
  layout: 'chating-layout',
//   key: (route) => {
//     const key = `/chat/${route.params.chatObjectId}`;
//     // console.log('keepAliveKey', key, route);
//     return key;
//   },
  keepAlive: true,
  validate: (route) => {
    return Number(route.params.chatObjectId) > 0;
  },
});
</script>



<template>Create Room</template>
