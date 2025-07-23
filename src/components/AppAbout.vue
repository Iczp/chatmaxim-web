<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: false,
  },
});

onMounted(() => {
  console.log('AppAbout mounted');
});

onUnmounted(() => {
  console.log('AppAbout onUnmounted');
});
</script>

<template>
  <div>
    {{ title }}
    about about about
  </div>
</template>
