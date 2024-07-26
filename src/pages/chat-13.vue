<script lang="ts" setup>
import { ref } from 'vue';
const counter = ref(0);
const onClick = () => {
  counter.value++;
};
</script>

<template>
  <div @click="onClick">
    Chat Page

    {{ counter }}

    <h3>
      <NuxtLink to="/chat">Chat</NuxtLink>
    </h3>

    <ul>
      <li v-for="(item, index) in 14" :key="item">
        <NuxtLink :to="`/chat/${item}/asdfasdf`">Chat:{{ item }}</NuxtLink>
      </li>
    </ul>

    <NuxtPage> </NuxtPage>
  </div>
</template>
