<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();

const { badge, badgeItems, refresh, isPending } = useBadges();

import { type BadgeDto } from '../apis/dtos';

const isChatActive = (chatObjectId: number): boolean => {
  return (
    route.path.startsWith('/chat/') &&
    chatObjectId == Number(route.params.chatObjectId)
  );
};

const navToChatHitory = (item: BadgeDto) => {
  const chatObjectId = item.chatObjectId!;
  navToChat({
    chatObjectId,
  });
};

const activeId = ref<string | undefined>();

const onItemClick = (item: any) => {
  console.log('onItemClick', item);
  item.click && item.click(item);
};
</script>
<template>
  <ul class="flex-col gap-0 flex-center">
    <li v-if="isPending && badgeItems.length == 0" class="h-16 flex-center">
      <Icon name="eos-icons:three-dots-loading" class="text-3xl rotate-90" />
    </li>

    <li
      class="size-16 flex-center"
      v-for="(item, index) in badgeItems"
      :key="index"
      :title="item.owner?.fullPathName?.replace('/', ':')"
      :class="{active: isChatActive(item.chatObjectId!)}"
      @click="navToChatHitory(item)"
    >
      <a-badge class="flex" :count="item.badge">
        <!-- <MessageOutlined v-if="isChatActive(item.chatObjectId!)" /> -->
        <!-- <ChatObject :entity="item.owner"></ChatObject> -->
        <Avatar
          :entity="item.owner"
          :size="36"
          :shape="'square'"
          class="cursor-pointer hover:ring-gray-500 hover:ring-1 hover:rounded-md"
        ></Avatar>
      </a-badge>
    </li>
  </ul>
</template>
