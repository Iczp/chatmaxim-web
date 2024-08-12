<script setup lang="ts">
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
const props = defineProps<{
  time: string;
}>();
</script>

<template>
  <span>111</span>
</template>
