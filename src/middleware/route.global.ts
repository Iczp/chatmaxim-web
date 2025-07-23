import { useImStore } from '@/stores/imStore';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
export default defineNuxtRouteMiddleware(async (to, from) => {
  // console.log('route middleware', to);
  if (to.params.id === '1') {
    return abortNavigation();
  }
  // In a real app you would probably not redirect every route to `/`
  // however it is important to check `to.path` before redirecting or you
  // might get an infinite redirect loop

  // if (to.path !== '/') {
  //   return navigateTo('/');
  // }

  const imsStore = useImStore();

  console.log('route middleware', to);

  await gog();

  console.log('isChatPath', to.fullPath, isChatPath(to.fullPath));

  if (isChatPath(to.fullPath) && to.params.chatObjectId) {
    // imsStore.getBadgeByCurrentUser();

    const isCurrentChatObject = imsStore.chatObjectItems.some(
      (x) => Number(x.id) == Number(to.params.chatObjectId)
    );

    console.log('route middleware', isCurrentChatObject);
    if (!isCurrentChatObject) {
      console.error('isCurrentChatObject', isCurrentChatObject);
      Modal.confirm({
        // title: 'Do you want to delete these items?',
        // icon: createVNode(ExclamationCircleOutlined),
        content: `不能访问:'${to.fullPath}'`,
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log('Oops errors!'));
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onCancel() {},
      });
      // return abortNavigation();
    }
  }
});

const isChatPath = (path: string) => {
  const regex =
    /^\/chat\/\d+(\/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})?$/gi;

  return regex.test(path);
};

const gog = () => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 0);
  });
};
