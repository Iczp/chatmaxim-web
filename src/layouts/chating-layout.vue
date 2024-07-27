<script lang="ts" setup>


</script>

<template>
  <div class="flex flex-row items-stretch flex-1 h-full">
    <NuxtRouteAnnouncer>
      <template #default="{ message }">
        <p>{{ message }} was loaded.</p>
      </template>
    </NuxtRouteAnnouncer>

    <Sider> </Sider>

    <div class="flex flex-col flex-1 w-full h-full overflow-hidden">
      <KeepAlive :max="10">
        <slot></slot>
      </KeepAlive>
    </div>
  </div>
</template>
