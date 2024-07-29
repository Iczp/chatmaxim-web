import { VerificationMethodEnums } from '../enums';
import type { ChatObjectDto } from './ChatObjectDto';
import type { EntryDto } from './EntryDto';

export type ChatObjectDetailDto = ChatObjectDto & {
  /**
   * 好友验证方式
   *
   * @type {VerificationMethodEnums}
   */
  verificationMethod?: VerificationMethodEnums;
  /**
   * 说明
   *
   * @type {string}
   */
  description?: string;
  /**
   * 条目（手机、Email等）
   *
   * @type {EntryDto[]}
   */
  entries?: EntryDto[];
};
