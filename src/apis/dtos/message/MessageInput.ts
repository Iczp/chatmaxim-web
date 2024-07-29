import type { CmdContentDto } from './CmdContentDto';
import type { MessageInputTyped } from './MessageInputTyped';
import type { TextContentDto } from './TextContentDto';

export type MessageInput = MessageInputTyped<any> & {
  content?: TextContentDto | CmdContentDto;
};
