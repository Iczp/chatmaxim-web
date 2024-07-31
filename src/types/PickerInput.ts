import { type IdDto } from '../apis/dtos';
export type PickerInput = {
  title?: string;
  isMultiple?: boolean;
  minCount?: number;
  maxCount?: number;
  selectedItems?: Array<IdDto>;
  disabledItems?: Array<IdDto>;
};
