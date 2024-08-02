import { message } from 'ant-design-vue';
import { type SessionUnitOwnerDto, SettingService } from '../apis';

import { useImStore } from '../stores/imStore';



export const successHandle = (content: string, entity: SessionUnitOwnerDto): void => {
  const store = useImStore();
  store.setMany([entity]);
  console.log(entity);
  message.success({ content, duration: 2 });
};

export const setTopping = ({
  sessionUnitId,
  isTopping,
}: {
  /**
   * 会话单元Id
   */
  sessionUnitId: string;
  /**
   * 是否置顶
   */
  isTopping?: boolean;
}) => {
  console.log('setTopping', sessionUnitId, isTopping);
  SettingService.postApiChatSettingSetTopping({ sessionUnitId, isTopping })
    .then(res => {
      successHandle(isTopping ? '置顶成功' : '取消置顶', res);
    })
    .catch(err => {
      message.error({ content: err.message, duration: 2 });
    });
};
export const setImmersed = ({
  sessionUnitId,
  isImmersed,
}: {
  /**
   * 会话单元Id
   */
  sessionUnitId: string;
  isImmersed?: boolean;
}) => {
  console.log('setImmersed', sessionUnitId, isImmersed);
  SettingService.postApiChatSettingSetImmersed({ sessionUnitId, isImmersed }).then(res => {
    successHandle(isImmersed ? '设置免打扰' : '取消免打扰', res);
    const store = useImStore();
    store.getBadgeByCurrentUser();
  });
};

export const setReadedMessageId = ({
  sessionUnitId,
  isForce,
  messageId,
}: {
  /**
   * 会话单元Id
   */
  sessionUnitId: string;
  /**
   * 是否强制
   */
  isForce?: boolean;
  /**
   * 消息Id
   */
  messageId?: number;
}) => {
  console.log('setReadedMessageId', sessionUnitId, isForce, messageId);

  SettingService.postApiChatSettingSetReadedMessageId({ sessionUnitId, isForce, messageId }).then(
    entity => {
      const store = useImStore();
      store.setMany([entity]);
      console.log('setReadedMessageId success', messageId);
    },
  );
};
