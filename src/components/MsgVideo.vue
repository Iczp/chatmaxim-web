<script setup lang="ts">
import { computed } from 'vue';
import type { MessageDto, VideoContentDto } from '../apis/dtos';
import MsgImg from './MsgImg.vue';
import PlayIcon from './PlayIcon.vue';
import { formatDurations } from '../utils/utils';
const props = defineProps<{
  item: MessageDto;
}>();

const content = computed(() => props.item.content as VideoContentDto);
const url = computed(() => content.value.gifUrl || content.value.snapshotUrl);
const suffix = computed(() =>
  content.value.duration ? formatDurations(content.value.duration * 1000) : content.value.suffix,
);
</script>

<template>
  <MsgImg
    class="msg-image"
    :url="url"
    :width="content.imageWidth || content.width || 240"
    :height="content.imageHeight || content.height || 135"
    :suffix="suffix"
    :size="content.size"
  >
    <div class="pointer-events-none abs">
      <PlayIcon class="btn-play" :percent="100" :size="36" />
    </div>
  </MsgImg>
</template>

<style scoped></style>
