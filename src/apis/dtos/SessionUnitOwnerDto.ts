import { ChatObjectTypeEnums } from '../enums';
import type { ChatObjectDto } from './ChatObjectDto';
import type { MessageDto } from './MessageDto';
import type { SessionItemDto } from './SessionItemDto';
import type { SessionUnitSettingDto } from './SessionUnitSettingDto';

export type SessionUnitOwnerDto = SessionItemDto & {
  /**
   *
   *
   * @type {string}
   */
  id?: string;

  /**
   *
   *
   * @type {number}
   */
  ownerId?: number;

  /**
   *
   *
   * @type {ChatObjectTypeEnums}
   */
  ownerObjectType?: ChatObjectTypeEnums;

  /**
   *
   *
   * @type {(number | null)}
   */
  lastMessageId?: number | null;

  /**
   *
   *
   * @type {number}
   */
  sorting?: number;

  /**
   *
   *
   * @type {string}
   */
  sessionId?: string;
  /**
   *
   *
   * @type {ChatObjectDto}
   */
  destination?: ChatObjectDto;
  /**
   *
   *
   * @type {SessionUnitSettingDto}
   */
  setting?: SessionUnitSettingDto;

  /**
   *
   *
   * @type {MessageDto}
   */
  lastMessage?: MessageDto;

  /**
   *
   *
   * @type {number}
   */
  publicBadge?: number;

  /**
   *
   *
   * @type {number}
   */
  privateBadge?: number;

  /**
   *
   *
   * @type {number}
   */
  remindAllCount?: number;

  /**
   *
   *
   * @type {number}
   */
  remindMeCount?: number;

  /**
   *
   *
   * @type {number}
   */
  followingCount?: number;

  /**
   *
   *
   * @type {number}
   */
  ticks?: number;

  /**
   * 是否客服
   *
   * @type {number}
   */
  isWaiter?: number;
};
