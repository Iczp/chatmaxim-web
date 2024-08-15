<script lang="ts" setup>


import ObjectPicker from './components/ObjectPicker.vue';
// import {useBrowserColor} from '@vueuse/core';

const createRoom = ref<InstanceType<typeof ObjectPicker> | null>(null);


const isDark = useDark();
const setBrowserColor = (isDark: boolean) =>
  useBrowserColor({
    themeColor: isDark ? '#111827' : '#f8fafc',
    appleStatusBarStyle: 'black-translucent',
  });
watch(isDark, setBrowserColor);

</script>

<template>
  <div class="w-full h-full">
    <ObjectPicker ref="createRoom" />
    <NuxtRouteAnnouncer>
      <template #default="{ message }">
        <p>{{ message }} was loaded.</p>
      </template>
    </NuxtRouteAnnouncer>

    <NuxtLayout>
      <KeepAlive>
        <NuxtPage />
      </KeepAlive>
    </NuxtLayout>
  </div>
</template>
