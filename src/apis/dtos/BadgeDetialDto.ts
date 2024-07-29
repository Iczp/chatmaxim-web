import type { BadgeDto } from './BadgeDto';
import type { ChatObjectDto } from './ChatObjectDto';

export type BadgeDetialDto = BadgeDto & {
  owner?: ChatObjectDto;
};
