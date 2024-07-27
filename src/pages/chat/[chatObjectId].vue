<script lang="ts" setup>
definePageMeta({
  layout: 'chating-layout',
});
const sessionUnitItems = ref([]);

const route = useRoute();
const chatObjectId = route.params.chatObjectId as number | string | undefined;

const sessionUnitId = computed(
  () => route.params.sessionUnitId as number | string | undefined
);

const navTo = (sessionUnitId: string | number | undefined) => {
  console.log('navto', chatObjectId, sessionUnitId);

  navigateTo(`/chat/${chatObjectId}/${sessionUnitId}`);
};
</script>

<template>
  <div class="flex flex-row h-full">
    <div class="flex flex-col h-full bg-slate-200 w-72">
      <header class="h-16">
        <h3>IM Chat,id:{{ $route.params.chatObjectId }}</h3>
      </header>
      <div>
        <ul class="flex flex-col">
          <li
            v-for="(item, index) in 20"
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
      <NuxtPage></NuxtPage>
    </div>
  </div>
</template>

<style scoped>
.active {
  @apply bg-slate-400;
}
</style>
