import type { CSSProperties } from 'vue';
import type { IdDto } from './IdDto';

export type AppDto = IdDto & {
  id?: string;
  groupId?: string;
  name?: string;
  description?: string;
  groupName?: string;
  url?: string;
  imageUrl?: string;
  color?: string;
  backgroundColor?: string;
  badge?: number;
  isDot?: boolean;
  children?: AppDto[];
  style?: CSSProperties;
};
