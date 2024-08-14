<script lang="ts" setup>
import type { ChatObjectDto, SessionRequestDetailDto } from '../apis/dtos';

import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { reactive } from 'vue';
import type { UnwrapRef } from 'vue';
import { message } from 'ant-design-vue';
import { SessionRequestService } from '../apis';
const { t } = useI18n();
defineProps<{
  destination?: ChatObjectDto;
  open?: boolean;
}>();
interface FormState {
  isAgreed?: boolean | null;
  handleMessage?: string;
}
const formState: UnwrapRef<FormState> = reactive({
  isAgreed: undefined,
  handleMessage: '',
});

const emits = defineEmits<{
  // confirm: [{ files?: Array<any>; text?: string }];
  cancel: [];
}>();

const entity = ref<SessionRequestDetailDto>();

const isOpen = ref(true);
const okText = computed(() => t('Send'));
const confirmLoading = ref<boolean>(false);
const okBtnDisabled = ref(false);

const cancel = ref<() => void>();

const handleCancel = (e: MouseEvent) => {
  // emits('cancel');
  cancel.value?.call(this);
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  confirmLoading.value = true;
  const key = 'session-request-handle';
  SessionRequestService.postApiChatSessionRequestHandleRequest({
    sessionRequestId: entity.value?.id!,
    isAgreed: formState.isAgreed!,
    handleMessage: formState.handleMessage,
  })
    .then((res) => {
      isOpen.value = false;
      message.success({ content: `ok`, key });
    })
    .catch((err) => {
      message.error({ content: `${err?.body?.error?.message}`, key });
    })
    .finally(() => {
      confirmLoading.value = false;
    });
};
</script>

<template>
  <div class="flex flex-row items-stretch flex-1 h-full">
    <!-- <a-modal
      class="drop-viewer"
      v-model:open="isOpen"
      :width="480"
      :ok-text="okText"
      :ok-button-props="{ disabled: okBtnDisabled }"
      :cancel-text="t('Cancel')"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      4556565
    </a-modal> -->
    <NuxtRouteAnnouncer>
      <template #default="{ message }">
        <p>{{ message }} was loaded.</p>
      </template>
    </NuxtRouteAnnouncer>

    <!-- <slot name="model"><div>model-layout</div></slot> -->

    <Sider> </Sider>

    <div class="flex flex-col flex-1 w-full h-full overflow-hidden">
      <KeepAlive :max="10">
        <slot></slot>
      </KeepAlive>
    </div>
     
  </div>
</template>
