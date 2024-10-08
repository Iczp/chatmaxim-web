<script setup lang="ts">
import { h } from 'vue';
import { SearchOutlined, PlusOutlined, MinusOutlined, RightOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { type CSSProperties, computed, reactive, ref, watch } from 'vue';
import type { SessionUnitOwnerDto, SessionUnitSettingDto } from '../apis/dtos';
import { ChatObjectTypeEnumText, ChatObjectTypeEnums } from '../apis/enums';
import { SettingService } from '../apis';
import { useImStore } from '../stores/imStore';
import ChatObject from './ChatObject.vue';

const store = useImStore();
type PropArgs = {
  chatObjectId?: number | number;
  sessionUnitId: string;
  entity?: SessionUnitOwnerDto;
};
const props = defineProps<PropArgs>();

// const setting = reactive<SessionUnitSettingDto>(store.getItem(props.sessionUnitId!)?.setting!);
// const entity = store.getItem(props.sessionUnitId!);

const setting = props.entity?.setting;

watch(
  () => props.entity,
  v => {
    // console.log('watch:', v);
  },
);

// const setting = reactive<SessionUnitSettingDto>({});

const onChange = (v: boolean | string | number, e: Event) => {
  console.log('onchange', v, e);
};

// const entity = reactive<SessionUnitOwnerDto>({});

const isTopping = ref(Number(props.entity?.sorting) > 0);
const isImmersed = ref(setting?.isImmersed);
const isContacts = ref(setting?.isContacts);
const isShowMemberName = ref(setting?.isShowMemberName);
const memberName = ref(setting?.memberName || '');
const rename = ref(setting?.rename || '');

const objectType = computed(() => props.entity?.destination?.objectType);

const setTopping = (v: boolean) => {
  console.log('setTopping', isTopping.value);
  SettingService.postApiChatSettingSetTopping({
    sessionUnitId: props.sessionUnitId,
    isTopping: !v,
  }).then(res => {
    store.setMany([res]);
    console.log(res);
    // Object.assign(entity, res);
  });
};
const setImmersed = (v: boolean) => {
  console.log('setImmersed', v);
  SettingService.postApiChatSettingSetImmersed({
    sessionUnitId: props.sessionUnitId,
    isImmersed: v,
  }).then(res => {
    console.log(res);
    store.setMany([res]);
    // Object.assign(entity, res);
  });
};
const setIsContacts = (v: boolean) => {
  console.log('setIsContacts', v);
  SettingService.postApiChatSettingSetIsConatcts({
    sessionUnitId: props.sessionUnitId,
    isContacts: !v,
  }).then(res => {
    console.log(res);
    store.setMany([res]);
  });
};
const setIsShowMenberName = (v: boolean) => {
  console.log('setIsShowMenberName', v);
  SettingService.postApiChatSettingSetIsShowMemberName({
    sessionUnitId: props.sessionUnitId,
    isShowMemberName: !v,
  }).then(res => {
    console.log(res);
    store.setMany([res]);
  });
};

const setRename = () => {
  if (rename.value == setting?.rename) {
    return;
  }
  SettingService.postApiChatSettingSetRename({
    sessionUnitId: props.sessionUnitId,
    rename: rename.value,
  }).then(res => {
    message.success('修改备注成功');
    store.setMany([res]);
  });
};

const iconStyle: CSSProperties = {
  color: 'rgba(100,100,100,0.5)',
  fontSize: '12px',
};

const isOpen = ref<boolean>(false);

const open = (args: PropArgs) => {
  isOpen.value = true;
};
const close = () => {
  isOpen.value = false;
};

const afterOpenChange = (bool: boolean) => {
  // console.log('open', bool);
};
// Expose
defineExpose({
  open,
  close,
});
</script>

<template>
  <a-drawer
    width="320"
    v-model:open="isOpen"
    class="chat-setting"
    root-class-name="chat-setting-root"
    :root-style="{ color: 'blue' }"
    title="聊天设置"
    placement="right"
    @after-open-change="afterOpenChange"
  >
    <scroll-view>
      <main>
        <section class="section">
          <a-space wrap>
            <chat-object v-for="(item, index) in 10" :key="index"></chat-object>
            <a-button type="dashed" class="btn-item" :icon="h(PlusOutlined)"></a-button>
            <a-button
              type="dashed"
              class="btn-item"
              :icon="h(MinusOutlined)"
              :disabled="true"
            ></a-button>
          </a-space>
        </section>

        <section class="section">
          <a-form-item label="名称">
            {{ entity?.destination?.name }}
          </a-form-item>
          <a-divider></a-divider>
          <a-form-item v-if="objectType == ChatObjectTypeEnums.Personal" label="备注名称">
            <a-input v-model:value="rename" :bordered="false" placeholder="-" @blur="setRename" />
          </a-form-item>
          <a-divider></a-divider>

          <a-form-item label="类型">
            {{ ChatObjectTypeEnumText[entity?.destination?.objectType!] }}
          </a-form-item>
          <a-divider></a-divider>
        </section>

        <section v-if="objectType == ChatObjectTypeEnums.Room" class="section">
          <a-form-item label="群名称">
            <a-input v-model:value="rename" :bordered="false" placeholder="-" />
          </a-form-item>

          <a-divider />

          <a-form-item label="群二维码">
            <RightOutlined :style="iconStyle" />
          </a-form-item>

          <a-divider />

          <a-form-item label="群公告">
            <RightOutlined :style="iconStyle" />
          </a-form-item>

          <a-divider>----------</a-divider>

          <a-form-item label="我在群里的名称">
            <a-input v-model:value="memberName" :bordered="false" placeholder="-" />
          </a-form-item>
          <a-divider></a-divider>

          <a-form-item label="显示成员名称">
            <a-switch v-model:checked="isShowMemberName" @change="setIsShowMenberName" />
          </a-form-item>
        </section>

        <section class="section">
          <a-form-item label="设置为免打扰">
            <a-switch v-model:checked="isImmersed" @change="setImmersed" />
          </a-form-item>
          <a-divider></a-divider>

          <a-form-item label="保存到通讯录">
            {{ isContacts }}
            <a-switch v-model:checked="isContacts" @change="setIsContacts" />
          </a-form-item>

          <a-divider />

          <a-form-item label="消息置顶">
            <a-switch v-model:checked="isTopping" @change="setTopping" />
          </a-form-item>
        </section>

        <section class="section">
          <a-form-item label="查找聊天记录">
            <RightOutlined :style="iconStyle" />
          </a-form-item>

          <a-form-item label="设置聊天背景">
            <RightOutlined :style="iconStyle" />
          </a-form-item>

          <a-form-item label="清空聊天记录">
            <RightOutlined :style="iconStyle" />
          </a-form-item>
        </section>

        <section class="section">
          <a-form-item label="投诉">
            <RightOutlined :style="iconStyle" />
          </a-form-item>
        </section>

        <section class="section">
          <a-button type="primary" html-type="submit" danger>删除会话</a-button>
        </section>
      </main>

      <a-form labelAlign="left" layout="horizontal">
        <div v-if="objectType == ChatObjectTypeEnums.Room"></div>

        <a-divider orientation="left">session</a-divider>

        <!-- <a-form-item :wrapper-col="{ offset: 8, span: 16 }"> -->

        <!-- </a-form-item> -->
      </a-form>
    </scroll-view>
  </a-drawer>
</template>

<style scoped>
:deep(.ant-drawer .ant-drawer-header) {
  height: var(--page-title-height);
}
:deep(.ant-drawer .ant-drawer-body) {
  padding: 0;
  background-color: red;
}

:deep(.ant-form-item) {
  margin: 8px 0;
}
:deep(.ant-form-item-control) {
  align-items: flex-end;
}
:deep(.ant-divider) {
  margin: 0;
}
:deep(.ant-input-borderless) {
  text-align: right;
}
:deep(.ant-divider-inner-text) {
  color: #f0f0f0;
}
.page {
  user-select: none;
}
.section {
  padding: 8px 16px;
  margin: 16px 0;
  /* background-color: white; */
}
.btn-item {
  height: 48px;
  width: 48px;
  border-radius: 8px;
}
/* .form-item {
  margin: 0;
} */
</style>
../../../stores/imStore