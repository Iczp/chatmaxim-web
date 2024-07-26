<script setup lang="ts">

</script>

<template>
  <div class="flex flex-row items-stretch flex-1 h-full">
    <NuxtRouteAnnouncer>
      <template #default="{ message }">
        <p>{{ message }} was loaded.</p>
      </template>
    </NuxtRouteAnnouncer>

    <Sider> </Sider>

    <div class="flex flex-col flex-1">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>
