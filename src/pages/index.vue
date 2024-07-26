<script lang="ts" setup>
const counter = ref(0);
const onClick = () => {
  counter.value++;
};
</script>

<template>
  <div @click="onClick">
    word

    {{ counter }}
  </div>
</template>
