<script setup lang="ts">
import { type ChatObjectDto } from '../apis/dtos';
import ChatObject from './ChatObject.vue';
import FileItem from './FileItem.vue';
import { computed, ref } from 'vue';
import { FileOutlined, CloseCircleOutlined } from '@ant-design/icons-vue';
import prettyBytes from 'pretty-bytes';
import { useI18n } from 'vue-i18n';
import { isImageMime } from '../utils/utils';
import { useObjectUrl } from '@vueuse/core';
import { type CSSProperties } from 'vue';
// import { isArray } from '@pureadmin/utils';
const { t } = useI18n();
// defineProps<{
//   // destination?: ChatObjectDto;
//   // files?: File[];
//   // text?: string;
//   // open?: boolean;
// }>();

const emits = defineEmits<{
  // confirm: [{ files?: Array<any>; text?: string }];
  cancel: [];
}>();

const destination = ref<ChatObjectDto>();
const files = ref<File[]>([]);

const text = ref<string>();
const isOpen = ref(false);
const isPreviewImage = ref(false);
const okText = computed(
  () => t('Send') + (files.value.length == 0 ? '' : `( ${files.value.length} )`),
);

const confirm = ref<(files?: File[], text?: string) => void>();
const cancel = ref<() => void>();

const open = (args: {
  destination?: ChatObjectDto;
  files?: File[];
  text?: string;
  isPreviewImage: boolean;
  onConfirm?: (files?: File[], text?: string) => void;
  onCancel?: () => void;
}) => {
  destination.value = args.destination;
  console.log('typeof args.files', typeof args.files, Array, Array.isArray(args.files));
  files.value = args.files || [];
  blobUrls.clear();
  files.value.forEach(file => {
    blobUrls.set(file, toBlobUrl(file));
  });
  text.value = args.text;
  isOpen.value = true;
  isPreviewImage.value = args.isPreviewImage;
  confirm.value = args.onConfirm;
  cancel.value = args.onCancel;
};
const close = () => {
  isOpen.value = false;
};

const handleCancel = (e: MouseEvent) => {
  // emits('cancel');
  cancel.value?.call(this);
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  confirm.value?.call(this, files.value, text.value);
  files.value = [];
  isOpen.value = false;
  // emits('confirm', { files: files.value, text: text.value });
};
const onDelete = (index: number): void => {
  files.value.splice(index, 1);
  if (files.value.length == 0) {
    isOpen.value = false;
  }
};
const isImage = (file: File) => {
  return isImageMime(file.type);
};

// 由于 useObjectUrl 是一个副作用函数，每次调用都会重新计算 URL，这可能导致递归更新的问题。
const toBlobUrl = (file: File): string => useObjectUrl(file).value!;

const onImageContainerClick = (file: File) => {
  console.log('onImageContainerClick', file);
};

// ChatGPT 方案
const blobUrls: Map<File, string> = new Map();

const imageContainerStyle = (file: File): any => {
  return {
    color: 'red',
    backgroundImage: `url(${blobUrls.get(file)})`,
  } as CSSProperties;
};

// Expose
defineExpose({
  open,
  close,
});
</script>

<template>
  <a-modal
    class="drop-viewer"
    v-model:open="isOpen"
    :width="360"
    :title="t('Send To')"
    :ok-text="okText"
    :cancel-text="t('Cancel')"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <page class="drop-viewer">
      <page-content>
        <div class="chat-object-container">
          <chat-object :entity="destination" class="chat-object" :size="32"></chat-object>
        </div>

        <a-divider class="divider" />
        <scroll-view class="scroll-view">
          <div v-if="text" class="text-viewer">
            {{ text }}
          </div>
          <div v-if="files.length != 0" class="file-list">
            <div v-for="(item, index) in files" class="hover">
              <FileItem
                :name="item?.name"
                :size="item.size"
                :suffix="`.${item?.name.split('.').pop()}`"
                :del="true"
                @delete="onDelete(index)"
              >
                <template v-if="isImage(item)" #icon>
                  <div
                    class="image-container"
                    @click="onImageContainerClick(item)"
                    :style="imageContainerStyle(item)"
                  >
                    <!-- <img :src="toBlobUrl(item)" class="preview-image" /> -->
                  </div>
                </template>
                <div class="file-info">{{ prettyBytes(item.size || 0) }}</div>
              </FileItem>
            </div>
          </div>
        </scroll-view>
      </page-content>
    </page>
  </a-modal>
</template>

<style scoped>
:deep(.ant-modal-title),
:deep(.ant-modal-content) {
  user-select: none;
}
:deep(.file-name) {
  max-width: 180px;
}

.drop-viewer {
  user-select: none;
  background-color: unset;
}
.drop-viewer {
  user-select: none;
  /* background-color: white;
  --background-color: #f5f5f5; */
}
.divider {
  margin: 6px 0;
}

.scroll-view {
  /* min-height: 300px; */
  max-height: 150px;
}
.text-viewer {
  user-select: text;
  padding: 12px;
  /* background-color: #272727; */
  background-color: var(--background-color-normal);
}
.file-list {
  display: flex;
  flex-direction: column;
  /* padding: 12px; */
  user-select: text;
  /* background-color: var(--background-color); */
}
.file-info {
  color: rgba(128, 128, 128, 0.511);
}
.hover {
  position: relative;
  background-color: var(--background-color-hover);
  /* background-color: #b8b8b8; */
}
.hover:last-child::after {
  content: unset;
}
.hover::after {
  content: '';
  position: absolute;
  left: 68px;
  right: 0;
  bottom: 0;
  /* background-color: #383838; */
  background-color: var(--divider-color);
  height: 1px;
  transform: translateY(0.25);
  /* z-index: 1; */
}
.hover:hover {
  background-color: var(--background-color-hover);
}
:deep(.delete) {
  opacity: 0;
}
.hover:hover :deep(.delete) {
  opacity: 1;
}

.image-container {
  width: var(--icon-size);
  height: var(--icon-size);
  overflow: hidden;
  display: flex;
  justify-items: center;

  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transition: all 0.3s linear;
}
.image-container:hover {
  background-size: cover;
}
.preview-image {
  width: 100%;
  /* height: 100%; */
}
</style>
