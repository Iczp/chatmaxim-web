<script lang="ts" setup>
definePageMeta({
  layout: 'chating-layout',
  key: (route) => {
    const key = `/chat/${route.params.chatObjectId}/${route.params.sessionUnitId}`;
    // console.log('keepAliveKey', key, route);
    return key;
  },
  keepAlive: true,
});
const route = useRoute();
const chatObjectId = computed(
  () => route.params.chatObjectId as string | undefined
);
const sessionUnitId = computed(
  () => route.params.sessionUnitId as string | undefined
);

onActivated((e: any) => {
  console.log('onActivated', chatObjectId, e);
});

onDeactivated(() => {
  console.log('onDeactivated', chatObjectId);
});
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <ChatTitle></ChatTitle>
    <MessageList
      :chat-object-id="chatObjectId"
      :session-unit-id="sessionUnitId"
    ></MessageList>
    <ChatInput></ChatInput>
  </div>
</template>
