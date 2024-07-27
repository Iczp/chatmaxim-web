<script setup lang="ts">
const props = defineProps<{
  chatObjectId?: string | number;
  sessionUnitId?: string;
}>();
</script>

<template>
  <div class="h-full overflow-y-auto bg-gray-50">
    dddd
    <ul class="flex flex-col">
      <li v-for="item in 50" :key="item" class="flex p-4">
        {{ item }} message-item - {{ chatObjectId }} - {{ sessionUnitId }}

        <strong>{{ new Date().getTime() }}</strong>
      </li>
    </ul>
  </div>
</template>
