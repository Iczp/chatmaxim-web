import {
  type WatchStopHandle,
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted,
  watch,
} from 'vue';

import { useMagicKeys } from '@vueuse/core';

export const useShortcuts = ({
  shortcuts,
  handle,
}: {
  shortcuts: string;
  handle: (isPressed: boolean, isActived: boolean, shortcuts: string) => void;
}) => {
  const keys = useMagicKeys();
  const CtrlEnter = keys['Ctrl+Enter'];
  const isActived = ref(true);
  const stopWatch = watch(CtrlEnter, (v, o) => {
    console.log('Ctrl+Enter have been pressed', v, isActived.value);
    handle(v, isActived.value, shortcuts);
  });

  onMounted(() => {});
  onUnmounted(() => {});
  onActivated(() => {
    isActived.value = true;
  });
  onDeactivated(() => {
    isActived.value = false;
  });

  return {
    stopWatch,
  };
};
