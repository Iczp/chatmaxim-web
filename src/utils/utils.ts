import moment from 'moment';
import { env } from '../env';
// import { router } from '../routes';
import type {
  ChatObjectDto,
  CmdContentDto,
  FileContentDto,
  ImageContentDto,
  MessageDto,
  MessageOwnerDto,
  MessageSimpleDto,
  SessionItemDto,
  SessionUnitOwnerDto,
  TextContentDto,
  VideoContentDto,
} from '../apis/dtos';
import { MessageStateEnums, MessageTypeEnums } from '../apis/enums';
import { formatText } from './formatWords';
import { useWindowStore } from '../stores/windowStore';
import { message } from 'ant-design-vue';
import type { SoundContentDto } from '../apis/dtos/message/SoundContentDto';
import type { LinkContentDto } from '../apis/dtos/message/LinkContentDto';
import type { HistoryContentOutput } from '../apis/dtos/message/HistoryContentOutput';
import { useObjectUrl } from '@vueuse/core';
import { getSoundDuration } from './soundUtils';
/**
 * toQueryString
 *
 * @template T
 * @param {T} obj
 * @return {*}  {string}
 */
export const toQueryString = <T>(obj: T): string => {
  var str = [];
  for (var p in obj)
    if (obj[p]) {
      let value = obj[p];
      if (typeof value == 'object') {
        // value = value.toString();
      }
      str.push(
        encodeURIComponent(p) +
          '=' +
          (value ? encodeURIComponent(value.toString()) : '')
      );
    }
  return str.join('&');
};

/**
 *
 * 格式化时间
 * @export
 * @param {*} datetime
 * @return {*}
 */
export function formatMessageTime(datetime: Date | string): any {
  if (typeof datetime == 'string') {
    datetime = new Date(datetime);
  }
  let fmt = 'yyyy年MM月DD日';
  let now = new Date();
  var weekday = ['日', '一', '二', '三', '四', '五', '六'];
  // 同年
  if (now.getFullYear() == datetime.getFullYear()) {
    fmt = 'M月DD日 HH:mm';
    // 同月
    if (now.getMonth() == datetime.getMonth()) {
      fmt = 'M月DD日 HH时';
      let spanTime = now.getTime() - datetime.getTime();
      // 同一天
      if (now.getDate() == datetime.getDate()) {
        fmt = `${formatHourStr(datetime)} HH:mm`;
        if (spanTime < 1000 * 60) {
          fmt = '[刚刚] HH:mm';
        }
      } else if (spanTime < 1000 * 60 * 60 * 24) {
        fmt = `昨天 ${formatHourStr(datetime)} HH:mm`;
      } else if (spanTime < 1000 * 60 * 60 * 24 * 7) {
        let week = weekday[datetime.getDay()];
        if (datetime.getDay() > now.getDay()) {
          fmt = `上周${week} HH:mm`;
        } else {
          fmt = `星期${week} HH:mm`;
        }
      }
    }
  }
  // return datetime;
  return moment(datetime).format(fmt);
}

export const formatDatetime = (
  datetime: Date | string,
  fmt = 'YYYY-MM-DD HH:mm:ss'
) => {
  // return datetime;
  return moment(datetime).format(fmt);
};

export const formatHourStr = (date: Date) => {
  const hours = date.getHours();
  let ret = '';
  if (hours < 6) {
    ret = '凌晨';
  } else if (hours < 12) {
    ret = '上午';
  } else if (hours < 18) {
    ret = '下午';
  } else if (hours < 24) {
    ret = '晚上';
  }
  return ret;
};

export const formatDurations = (duration: number): string => {
  return 'mm:ss';
  // return moment(duration).format('mm:ss');
};


export const getSenderNameForMessage = (
  entity?: MessageDto
): string | undefined => {
  if (!entity) {
    return undefined;
  }

  const senderSessionUnit = entity.senderSessionUnit;

  // const displayName = computed(
  //   () => props.entity?.fullPathName?.replace('/', ':') || props.entity?.name,
  // );

  return (
    senderSessionUnit?.owner?.fullPathName?.replace('/', ':') ||
    entity.senderName ||
    entity.senderDisplayName ||
    entity.senderSessionUnit?.displayName
  );
};

export const getDestinationNameForSessionUnit = (
  entity?: SessionUnitOwnerDto
): string | undefined | null => {
  return entity?.setting?.rename || entity?.destination?.name;
};

export const formatMessageContent = (
  entity?: MessageSimpleDto,
  t?: any
): {
  contentType: string | undefined;
  contentText: string;
} => {
  t = t || ((k: string): string => k);
  let contentType: string | undefined;
  let contentText: string = '';

  const isRollbacked = entity?.isRollbacked || entity?.rollbackTime != null;

  if (!entity) {
    return { contentType, contentText };
  }

  if (isRollbacked) {
    contentText = t('Message is rollbacked');
    return { contentType, contentText };
  }

  const content = entity.content;

  switch (entity.messageType) {
    case MessageTypeEnums.Contacts:
      contentType = `[${t('MessageType.Contacts')}]`;
      break;
    case MessageTypeEnums.Image:
      contentType = `[${t('MessageType.Image')}]`;
      break;
    case MessageTypeEnums.Video:
      contentType = `[${t('MessageType.Video')}]`;
      break;
    case MessageTypeEnums.File:
      contentType = `[${t('MessageType.File')}]`;
      contentText = formatText((content as FileContentDto).fileName!);
      break;
    case MessageTypeEnums.Sound:
      contentType = `[${t('MessageType.Sound')}语音]`;
      contentText = formatText((content as SoundContentDto).time!.toString());
      break;
    case MessageTypeEnums.Link:
      contentType = `[${t('MessageType.Link')}]`;
      contentText = formatText((content as LinkContentDto).url!);
      break;
    case MessageTypeEnums.History:
      contentType = `[${t('MessageType.History')}]`;
      contentText = formatText((content as HistoryContentOutput).title!);
      break;
    case MessageTypeEnums.Html:
      contentType = `[${t('MessageType.Html')}]`;
      contentText = formatText((content as HistoryContentOutput).title!);
      break;
    case MessageTypeEnums.Cmd:
      contentType = `[${t('MessageType.Cmd')}]`;
      contentText = formatText((content as CmdContentDto).text!);
      break;
    case MessageTypeEnums.Text:
      contentType = ``;
      contentText = formatText((content as TextContentDto).text!);
      break;
    default:
      contentText = `[t('MessageType.Unsupported')}]`;
      break;
  }
  return { contentType, contentText };
};

/**
 * 数组 groupBy
 *
 * @template T
 * @template Q
 * @param {T[]} array
 * @param {(value: T, index: number, array: T[]) => Q} predicate
 * @return {*}  {Map<Q, T[]>}
 * @example 
 * 
  groupByToMap(items, x => x.ownerId!)
    .forEach((list, ownerId) => {
      this.setSessionItems(ownerId, list, keyword);
    });
 */
export const groupByToMap = <T, Q>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => Q
): Map<Q, T[]> =>
  array.reduce((map, value, index, array) => {
    const key = predicate(value, index, array);
    map.get(key)?.push(value) ?? map.set(key, [value]);
    return map;
  }, new Map<Q, T[]>());

/**
 * 依次排序：sorting/lastMessageId
 *
 * @param {SessionItemDto} a
 * @param {SessionItemDto} b
 * @return {*}  {number}
 */
export const sortSessionItemDto = (
  a: SessionItemDto,
  b: SessionItemDto
): number => {
  if (a.sorting! > b.sorting!) {
    return -1;
  } else if (a.sorting! < b.sorting!) {
    return 1;
  }
  if (a.lastMessageId! > b.lastMessageId!) {
    return -1;
  } else if (a.lastMessageId! < b.lastMessageId!) {
    return 1;
  }
  return 0;
};

/**
 * SessionUnitOwnerDto => SessionItemDto
 * @param {SessionUnitOwnerDto} x
 * @return {*}  {SessionItemDto}
 */
export const mapToSessionItemDto = (x: SessionUnitOwnerDto): SessionItemDto => {
  const { id, ownerId, sorting, lastMessageId } = x;
  return { id, ownerId, sorting, lastMessageId };
};

/**
 * 格式化消息
 *
 * @param {{
 *   sessionUnitId: string;
 *   items: MessageDto[];
 *   timespan?: number;
 *   lastItem?: MessageDto;
 * }} {
 *   sessionUnitId,
 *   items,
 *   timespan = 1000 * 60 * 3,
 *   lastItem = undefined,
 * }
 * @return {*}  {MessageDto[]}
 */
export const formatMessage = ({
  sessionUnitId,
  items,
  timespan = 1000 * 60 * 3,
  lastItem = undefined,
}: {
  sessionUnitId: string;
  items: MessageDto[];
  timespan?: number;
  lastItem?: MessageDto;
}): MessageDto[] => {
  // 3分钟
  // const Split_Time = 1000 * 60 * 3
  // 时间分组
  let splitTime = timespan || 1000 * 60 * 3;
  let getTmpSendTime = (item: MessageDto): Date | undefined =>
    new Date(item?.creationTime!);
  let tmpTime: Date | undefined = lastItem
    ? getTmpSendTime(lastItem)
    : undefined;

  items.map((item) => {
    // console.error('item.isReverse', item.isReverse)

    item.isSelf = sessionUnitId == item.senderSessionUnit?.id;
    // item.sendTime = getTmpSendTime(item);
    if (typeof item.state == 'undefined') {
      item.state = MessageStateEnums.Ok;
    }
    // autoId
    if (!item.autoId) {
      item.autoId = item.id;
    }

    //时间分组
    if (tmpTime == null) {
      item.isShowTime = true;
      tmpTime = getTmpSendTime(item);
    } else {
      let sp = new Date(item.creationTime!).getTime() - tmpTime.getTime();
      // console.error(sp);
      if (sp > splitTime) {
        item.isShowTime = true;
        tmpTime = getTmpSendTime(item);
      } else {
        item.isShowTime = false;
      }
    }
  });
  return items;
};

export const mapToFileContentDto = (file: File): FileContentDto => {
  const blob = useObjectUrl(file);
  return <FileContentDto>{
    fileName: file.name,
    contentType: file.type,
    size: file.size,
    path: blob.value,
    suffix: getSuffix(file.name),
    lastModifiedDate: file.lastModified,
  };
};

export const getSuffix = (fileName?: string) => {
  return `.${fileName?.split('.').pop()}`;
};

export const mapToSoundContentDto = async (
  file: File
): Promise<SoundContentDto> => {
  const blob = useObjectUrl(file);
  const dto = <SoundContentDto>{
    fileName: file.name,
    contentType: file.type,
    size: file.size,
    path: blob.value,
    suffix: getSuffix(file.name),
    lastModifiedDate: file.lastModified,
  };
  try {
    const duration = await getSoundDuration(file.path);
    dto.time = duration * 1000;
  } catch (error) {}
  return dto;
};

export const mapToVideoContentDto = (file: File): Promise<VideoContentDto> =>
  new Promise<VideoContentDto>((resolve, reject) => {
    const blob = useObjectUrl(file);
    const dto = <VideoContentDto>{
      fileName: file.name,
      contentType: file.type,
      size: file.size,
      path: blob.value,
      suffix: getSuffix(file.name),
      lastModifiedDate: file.lastModified,
    };
    resolve(dto);
  });

export const mapToImageContentDtoAsync = (
  file: File
): Promise<ImageContentDto> =>
  new Promise<ImageContentDto>((resolve, reject) => {
    const blob = useObjectUrl(file);
    console.log('blob', file.name, blob);
    getImageRect(blob.value!)
      .then((img) => {
        console.log({ height: img.height, width: img.width });
        const imageContentDto = <ImageContentDto>{
          text: file.name,
          contentType: file.type,
          size: file.size,
          path: blob.value,
          suffix: getSuffix(file.name),
          lastModifiedDate: file?.lastModified,
          width: img.width,
          height: img.height,
          // qrcode: '',
          // orientation: '',
          // thumbnailActionUrl: '',
          // thumbnailUrl: '',
        };
        console.log('imageContentDto', imageContentDto);
        resolve(imageContentDto);
      })
      .catch((err) => {
        console.error('load image error:', file.path, err);
        reject(err);
      });
  });

export const getParentName = (entity?: ChatObjectDto): string | undefined => {
  console.log('getParentName entity', entity);
  const names = entity?.fullPathName?.split('/') || [];
  return names.length == 2 ? names[0] : undefined;
};

export const getDisplayName = (entity: ChatObjectDto): string | undefined =>
  entity.fullPathName?.replace('/', ':') || entity.name;

export const enumToKeyValues = (
  enums: object,
  prefix?: string,
  t?: any
): Array<{ label: string; value: any }> => {
  return Object.entries(enums)
    .filter(([a, b]) => Number(b) >= 0)
    .map(([key, value]) => ({ label: t(prefix + key), value }));
};

export const formatUrl = (url?: string): string | undefined => {
  if (!url) {
    return undefined;
  }
  if (url.startsWith('/')) {
    return `${env.base_url}${url}`;
  }
  return url;
};

export const imageContentTypes = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/gif',
];
export const isImageMime = (contentType?: string | null): boolean => {
  if (!contentType) {
    return false;
  }
  return imageContentTypes.some((x) => x == contentType.toLocaleLowerCase());
};

export const isVideoMime = (contentType?: string | null): boolean => {
  if (!contentType) {
    return false;
  }
  return contentType.startsWith('video/');
};

export const audioSuffixs = [
  '.mp3',
  '.mpeg',
  '.opus',
  '.ogg',
  '.oga',
  '.wav',
  '.aac',
  '.caf',
  '.m4a',
  '.m4b',
  // '.mp4',
  '.weba',
  '.webm',
  '.dolby',
  '.flac',
];
export const isAudioSuffix = (fileName?: string | null): boolean => {
  console.log('isAudioSuffix', fileName);
  if (!fileName) {
    return false;
  }
  const suffix = getSuffix(fileName);
  return audioSuffixs.some((x) => x == suffix);
};

export const formatImageRect = (
  // w: number,
  // h: number,
  ratio: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } => {
  // const ratio = w / h;
  let width = ratio > 1 ? maxWidth : maxHeight * ratio;
  let height = ratio > 1 ? maxWidth / ratio : maxHeight;
  if (height > maxHeight) {
    height = maxHeight;
    width = maxHeight * ratio;
  }
  return { width, height };
};

export const getImageRect = (
  imgUrl: string
): Promise<{ width: number; height: number }> => {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    loadImage(imgUrl)
      .then((img) => {
        console.log(`width:${img.width},height:${img.height}`);
        resolve({ width: img.width, height: img.height });
      })
      .catch(reject);
  });
};

export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = reject;
    img.src = src;
  });
};

export const isImageOfMessage = (entity?: MessageOwnerDto): boolean => {
  if (!entity) {
    return false;
  }
  if (entity.messageType == MessageTypeEnums.Image) {
    return true;
  }
  if (entity.messageType == MessageTypeEnums.File) {
    const content = entity.content as FileContentDto;
    return isImageMime(content.contentType);
  }
  return false;
};

export const isVideoOfMessage = (entity?: MessageOwnerDto): boolean => {
  if (!entity) {
    return false;
  }
  if (entity.messageType == MessageTypeEnums.Video) {
    return true;
  }
  if (entity.messageType == MessageTypeEnums.File) {
    const content = entity.content as FileContentDto;
    return isVideoMime(content.contentType);
  }
  return false;
};

export const isPdfOfMessage = (entity?: MessageOwnerDto): boolean => {
  if (!entity) {
    return false;
  }
  if (entity.messageType == MessageTypeEnums.File) {
    const content = entity.content as FileContentDto;
    return content.suffix?.toLocaleLowerCase() == '.pdf';
  }
  return false;
};

export const isCodeOfMessage = (entity?: MessageOwnerDto): boolean => {
  if (!entity) {
    return false;
  }
  if (entity.messageType == MessageTypeEnums.File) {
    const content = entity.content as FileContentDto;
    const suffix = content.suffix?.toLocaleLowerCase();
    const contentType = content.contentType;
    const codeSuffixs = [
      '.txt',
      '.md',
      '.json',
      '.json5',
      '.html',
      '.htm',
      '.cs',
      '.ts',
      '.js',
      '.log',
    ];
    return (
      codeSuffixs.some((x) => x == suffix) ||
      contentType?.startsWith('text/') ||
      false
    );
  }
  return false;
};

export const getVideoOfMessage = (
  entity?: MessageOwnerDto
): string | undefined => {
  if (!entity) {
    return;
  }
  if (entity.messageType == MessageTypeEnums.Video) {
    return (entity.content as VideoContentDto).contentType || undefined;
  }
  if (entity.messageType == MessageTypeEnums.File) {
    return (entity.content as FileContentDto).contentType || undefined;
  }
};

export const getFileNameOfMessage = (entity?: MessageOwnerDto): string => {
  let { fileName, suffix, id } = entity?.content;

  if (!fileName) {
    fileName = `${env.app_name}_${id || new Date().getTime()}${
      suffix || '.unknown'
    }`;
  }
  // if (!suffix) {
  //   suffix = '.unknown';
  // }

  return `${fileName}`;
};

/**
 * 消息内容中的附件下载地址
 *
 * @param {MessageOwnerDto} entity
 * @return {*}  {boolean}
 */
export const isMessageUrl = (entity: MessageOwnerDto): boolean => {
  if (!entity.content?.url) {
    const content = 'Url is null';
    message.error({ content, key: 'message-viewer' });
    return false;
  }
  return true;
};

// 设置选中的节点
export const setSelectedNode = (event?: Event): void => {
  const selection = window.getSelection();
  const range = document.createRange();
  // console.log('setSelectedText', event, range);
  range.selectNodeContents(event?.target as Node);
  selection?.removeAllRanges();
  selection?.addRange(range);
};

// 获取选中的文本
export const getSelectedText = (): string | undefined => {
  let selectedText;
  if (window.getSelection) {
    selectedText = window.getSelection()?.toString();
  }
  return selectedText;
};

export const fileToContent = async (
  file: File
): Promise<{ messageType: MessageTypeEnums; content: any }> => {
  if (isImageMime(file.type)) {
    return {
      messageType: MessageTypeEnums.Image,
      content: await mapToImageContentDtoAsync(file),
    };
  }

  if (isVideoMime(file.type)) {
    return {
      messageType: MessageTypeEnums.Video,
      content: await mapToVideoContentDto(file),
    };
  }

  if (isAudioSuffix(file.name)) {
    return {
      messageType: MessageTypeEnums.Sound,
      content: await mapToSoundContentDto(file),
    };
  }

  return {
    messageType: MessageTypeEnums.File,
    content: mapToFileContentDto(file),
  };
};

/**
 * 两点之的距离
 * @param {*} p1
 * @param {*} p2
 * @returns
 */
export const getDistance = (p1: MouseEvent, p2: MouseEvent) => {
  var x = p2.pageX - p1.pageX,
    y = p2.pageY - p1.pageY;
  return Math.sqrt(x * x + y * y);
};
/**
 * 两点之的
 * @param {*} p1
 * @param {*} p2
 * @returns
 */
export const getPoint = (p1: MouseEvent, p2: MouseEvent) => {
  var x = p1.pageX - p2.pageX,
    y = p1.pageY - p2.pageY;
  return { x, y };
};

/**
 * 两点之的角度
 * @param {*} p1
 * @param {*} p2
 * @returns
 */
export const getAngle = (p1: MouseEvent, p2: MouseEvent) => {
  var x = p1.pageX - p2.pageX,
    y = p1.pageY - p2.pageY;
  return (Math.atan2(y, x) * 180) / Math.PI;
};

/**
 * 笛卡尔乘积

 * @param args 
 * @returns 
 * @example 
 * 
// 示例用法
const arr1: string[] = ['a', 'b'];
const arr2: number[] = [1, 2];
const result = cartesian(arr1, arr2);
console.log(result);
// [
//   ['a', 1],
//   ['a', 2],
//   ['b', 1],
//   ['b', 2],
// ];

 */

export function cartesian(...args: any[][]): any[][] {
  return args.reduce<any[][]>(
    (a, b) => {
      const ret: any[][] = [];
      a.forEach((aItem) => {
        b.forEach((bItem) => {
          ret.push([...aItem, bItem]);
        });
      });
      return ret;
    },
    [[]]
  );
}

/**
 * 笛卡尔乘积

 * @param args 
 * @returns 
 * @example 
 * 
// 示例用法
const arr1: string[] = ['a', 'b'];
const arr2: number[] = [1, 2];
const result = cartesian(arr1, arr2);
console.log(result);
// [
//   ['a', 1],
//   ['a', 2],
//   ['b', 1],
//   ['b', 2],
// ];

 */
export function cartesian1(...args: any[][]): any[][] {
  if (args.length === 0) return [];

  const result: any[][] = [];
  const helper = (arrIndex: number, current: any[]) => {
    if (arrIndex === args.length) {
      result.push(current);
      return;
    }

    for (const value of args[arrIndex]) {
      helper(arrIndex + 1, [...current, value]);
    }
  };

  helper(0, []);
  return result;
}
