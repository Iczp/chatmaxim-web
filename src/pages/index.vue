<script lang="ts" setup>
const counter = ref(0);
const onClick = () => {
  counter.value++;
};
</script>

<template>
  <div @click="onClick">
    index
    <h3 class="text-lg">
      <NuxtLink to="/chat/13/16">
        <Icon name="mdi:abjad-arabic"></Icon>

        Chating</NuxtLink
      >
    </h3>

    {{ counter }}
  </div>
</template>
