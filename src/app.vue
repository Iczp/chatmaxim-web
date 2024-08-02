<script lang="ts" setup>
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
