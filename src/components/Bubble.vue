<script setup lang="ts">
import { type CSSProperties } from 'vue';

const props = defineProps<{
  value?: string;
  // reverse
  r?: boolean;
  style?: CSSProperties;
}>();
</script>

<template>
  <div class="bubble" :style="style" :class="r ? 'right' : 'left'">
    <slot></slot>
    <!-- <footer class="bubble-footer">123</footer> -->
  </div>
</template>

<style scoped>
/* https://freefrontend.com/css-speech-bubbles/ */


.bubble:hover {
  /* color: #ffffff; */
  background: linear-gradient(135deg, rgba(14, 55, 205, 0.4), rgba(1, 156, 148, 0.4)) border-box;
}
.left {
  --_d: 0%;
  border-left: var(--t) solid #0000;
  margin-right: var(--t);
  place-self: start;
}
.right {
  --_d: 100%;
  border-right: var(--t) solid #0000;
  margin-left: var(--t);
  place-self: end;
  background: linear-gradient(135deg, rgba(1, 156, 148, 0.3), rgba(14, 55, 205, 0.3)) border-box;
}
/* .bubble-footer {
  position: relative;
  width: 100%;
  border-top: 1px solid #0000;
}
.bubble-footer::after {
  content: '';
  height: 1px;
  left: 72px;
  right: 0px;
  bottom: 0;
  position: absolute;
  transform: scaleY(0.5);
  overflow: hidden;
  background-color: rgb(0, 0, 0);
  width: 100%;
} */
</style>
