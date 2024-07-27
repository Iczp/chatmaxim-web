<script lang="ts" setup>
definePageMeta({
  layout: 'chating-layout',
  key: (route) => {
    const key = `/chat/${route.params.chatObjectId}`;
    // console.log('keepAliveKey', key, route);
    return key;
  },
  // keepAlive: true,
});
const sessionUnitItems = ref([]);

const route = useRoute();
const chatObjectId = route.params.chatObjectId as number | string | undefined;

const sessionUnitId = computed(
  () => route.params.sessionUnitId as number | string | undefined
);

const navTo = (sessionUnitId: string | number | undefined) => {
  // console.log('navto', chatObjectId, sessionUnitId);

  navigateTo(`/chat/${chatObjectId}/${sessionUnitId}`);
};

onActivated((e: any) => {
  console.log('onActivated', chatObjectId, e);
});

onDeactivated(() => {
  console.log('onDeactivated', chatObjectId);
});

onMounted(() => {
  console.log('onMounted', chatObjectId);
});
onBeforeRouteUpdate(() => {
  // console.log('onBeforeRouteUpdate', chatObjectId);
});
</script>

<template>
  <div class="flex flex-row h-full">
    <div class="flex flex-col h-full bg-slate-200 w-72">
      <header class="flex h-16 shrink-0">
        <h3>IM Chat,id:{{ $route.params.chatObjectId }}</h3>
      </header>
      <div class="overflow-x-auto scroll-m-2">
        <ul class="flex flex-col">
          <li
            v-for="(item, index) in 100"
            :key="index"
            class="flex items-center p-4 cursor-default bg-slate-200 hover:bg-slate-300"
            :class="{ active: item == sessionUnitId }"
            @click="navTo(item)"
          >
            {{ chatObjectId }} - {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <div class="flex flex-col flex-1">
      <KeepAlive :max="10">
        <NuxtPage></NuxtPage>
      </KeepAlive>
    </div>
  </div>
</template>

<style scoped>
.active {
  @apply bg-slate-400;
}
</style>
