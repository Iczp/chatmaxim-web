<script setup lang="ts">
import { computed } from 'vue';
import type { MessageDto, TextContentDto } from '../apis/dtos';
import Bubble from './Bubble.vue';
import TextViewer from './TextViewer.vue';
import { type WordDto } from '../utils/formatWords';
const props = defineProps<{
  item: MessageDto;
}>();
const content = computed(() => props.item.content as TextContentDto);
const onWordClick = (item: WordDto, event?: Event) => {
  console.log('onWordClick', item, event);
};
</script>

<template>
  <Bubble :r="item.isSelf" class="msg-text" :class="{ self: item.isSelf }">
    <TextViewer :value="content?.text!" @word-click="onWordClick" />
  </Bubble>
</template>

<style scoped>
.msg-text {
  padding: 8px;
  min-height: 40px;
  min-width: 40px;
  line-height: 24px;
  max-width: var(--message-max-width);
  background-color: var(--msg-text-background-color);
  color: var(--msg-text-color);
  background: var(--msg-text-background);
}
.msg-text:hover {
  color: var(--msg-text-hover-color);
  background-color: var(--msg-text-hover-background-color);
  background: var(--msg-text-hover-background);
}
.msg-text.self {
  color: var(--msg-text-self-color);
  background-color: var(--msg-self-text-background-color);
  background: var(--msg-text-self-background);
}
.msg-text.self:hover {
  color: var(--msg-text-self-hover-color);
  background-color: var(--msg-self-text-hover-background-color);
  background: var(--msg-text-self-hover-background);
}
</style>
