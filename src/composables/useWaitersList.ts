import { ShopWaiterService } from '../apis';
import { type ChatObjectDto } from '../apis/dtos';
import { type ShopWaterGetListInput } from '../apis/dtos/ShopWaterGetListInput';
import { useFetchList } from './useFetchList';
import { type PickerInput } from '../types/PickerInput';

export const useWaitersList = ({
  input,
  picker,
}: {
  input: ShopWaterGetListInput;
  picker?: PickerInput;
}) =>
  useFetchList<ShopWaterGetListInput, ChatObjectDto>({
    service: ShopWaiterService.getApiChatShopWaiterList,
    input,
    picker,
  });
