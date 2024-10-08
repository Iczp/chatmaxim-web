<script setup lang="ts">
import { toRaw, ref, watch, computed } from 'vue';
import { ChatObjectDto } from '../apis/dtos';
import { useI18n } from 'vue-i18n';

import { message } from 'ant-design-vue';
import { SessionPermissionService, SessionRoleBySessionUnitService } from '../apis';
import { SessionRoleDetailDto } from '../apis/models/SessionRoleDetailDto';
import { PermissionGrantValue } from '../apis/models/PermissionGrantValue';

import type { TreeProps } from 'ant-design-vue';
import { SessionPermissionDefinitionTreeDto } from '../apis/models/SessionPermissionDefinitionTreeDto';
import { DataNode } from 'ant-design-vue/es/tree';
type Args = { entity?: SessionRoleDetailDto; id?: string; sessionUnitId: string };
type TreeType = TreeProps['treeData'];

const { t } = useI18n();

defineProps<{
  destination?: ChatObjectDto;
  open?: boolean;
}>();

interface FormState {
  name?: string | null;
  description?: string | null;
  isDefault?: boolean;
  permissionGrant?: Record<string, PermissionGrantValue> | null;
}

const formTitle = computed(() => (isCreate.value ? t('RoleAdd') : t('RoleEdit')));
const isCreate = computed(() => !args.value?.id);
const formState = ref<FormState>({
  description: null,
  isDefault: false,
  permissionGrant: null,
});

const labelCol = { style: { width: '150px' } };

const wrapperCol = { span: 14 };

const emits = defineEmits<{
  // confirm: [{ files?: Array<any>; text?: string }];
  change: [];
  cancel: [];
}>();

const entity = ref<SessionRoleDetailDto>();

const isOpen = ref(false);
const okText = computed(() => t('Confirm'));
const confirmLoading = ref<boolean>(false);
const okBtnDisabled = ref(false);
const formDisabled = ref(false);

const cancel = ref<() => void>();
const isPending = ref(false);
const id = ref('');
const args = ref<Args>();

const open = (input: Args) => {
  initData();
  isOpen.value = true;
  args.value = input;
  console.log('open input', input);
  formState.value = {};

  if (input.id) {
    isPending.value = true;
    okBtnDisabled.value = true;
    SessionRoleBySessionUnitService.getItem({
      id: input.id!,
      sessionUnitId: input.sessionUnitId!,
    })
      .then(res => {
        console.log('getItem', res);
        formState.value = res as FormState;
        checkedKeys.value = Object.keys(res.permissionGrant!);
        okBtnDisabled.value = false;
      })
      .finally(() => {
        isPending.value = false;
      });
  }
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
  confirmLoading.value = true;
  const key = 'session-request-handle';
  const postData = toRaw(formState.value);
  postData.permissionGrant = formatChecked();
  SessionRoleBySessionUnitService.createOrUpdate({
    id: args.value?.id,
    sessionUnitId: args.value?.sessionUnitId!,
    requestBody: postData,
  })
    .then(res => {
      isOpen.value = false;
      message.success({
        content: isCreate.value ? t('CreateSuccessful') : t('UpdateSuccessful'),
        key,
      });
      emits('change');
    })
    .catch(err => {
      message.error({ content: `${err?.body?.error?.message}`, key });
    })
    .finally(() => {
      confirmLoading.value = false;
    });
};

const treeData = ref<TreeType>([]);
const selectedKeys = ref<string[]>([]);
const checkedKeys = ref<string[]>([]);

const initData = () => {
  selectedKeys.value = [];
  checkedKeys.value = [];
  fetchPermission();
};
const fetchPermission = () => {
  SessionPermissionService.getDefinitions().then(items => {
    treeData.value = formatChildren(items);
  });
};

const formatChildren = (items: SessionPermissionDefinitionTreeDto[]): TreeType => {
  return items.map(
    x =>
      <DataNode>{
        title: x.title,
        key: x.id,
        checkable: true,
        selectable: false,
        disabled: x.isGroup && x.children?.length == 0,
        children: formatChildren(x.children!),
      },
  );
};

const formatChecked = (): Record<string, PermissionGrantValue> => {
  const obj: Record<string, PermissionGrantValue> = {};
  checkedKeys.value
    .filter(x => !x.startsWith('groupid:'))
    .map(x => {
      obj[x] = <PermissionGrantValue>{
        isEnabled: true,
        value: 1,
      };
    });
  return obj;
};

watch(selectedKeys, () => {
  console.log('selectedKeys', selectedKeys);
});
watch(checkedKeys, () => {
  console.log('checkedKeys', checkedKeys);
});

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
    :title="formTitle"
    :width="480"
    :ok-text="okText"
    :ok-button-props="{ disabled: okBtnDisabled }"
    :cancel-text="t('Cancel')"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <page class="drop-viewer">
      <page-content>
        <a-form
          :model="formState"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          :disabled="formDisabled"
        >
          <a-form-item :label="t('RoleName')">
            <a-input v-model:value="formState.name" class="no-resize" />
          </a-form-item>

          <a-form-item :label="t('RoleDescription')">
            <a-textarea v-model:value="formState.description" class="no-resize" />
          </a-form-item>
        </a-form>

        <h3>权限</h3>
        <!-- </scroll-view> -->
        <a-tree
          v-model:selectedKeys="selectedKeys"
          v-model:checkedKeys="checkedKeys"
          checkable
          :height="180"
          :tree-data="treeData"
        >
          <template #title="{ title, key }">
            <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>
            <template v-else>{{ title }}</template>
          </template>
        </a-tree>
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
</style>
