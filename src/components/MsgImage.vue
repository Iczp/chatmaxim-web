<script setup lang="ts">
import { computed } from 'vue';
import { type MessageDto } from '../apis/dtos';
import { type ImageContentDto } from '../apis/dtos/message/ImageContentDto';
import MsgImg from './MsgImg.vue';

const props = defineProps<{
  item: MessageDto;
}>();

const content = computed(() => props.item.content as ImageContentDto);
</script>

<template>
  <MsgImg
    class="msg-image"
    :url="content.thumbnailUrl!"
    :path="content.path"
    :width="content.width"
    :height="content.height"
    :suffix="content.suffix"
    :size="content.size"
  ></MsgImg>
</template>

<style scoped></style>
