import type { SessionUnitDestinationDto } from './SessionUnitDestinationDto';
import type { SessionUnitSettingDto } from './SessionUnitSettingDto';

export type SessionUnitSenderDto = SessionUnitDestinationDto & {


  /**
   * 设置
   *
   * @type {(SessionUnitSettingDto | null)}
   */
  setting?: SessionUnitSettingDto | null;
};
