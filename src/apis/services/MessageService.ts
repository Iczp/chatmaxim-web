/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IczpNet_Chat_Enums_Dtos_EnumDto } from '../models/IczpNet_Chat_Enums_Dtos_EnumDto';
import type { IczpNet_Chat_MessageSections_Messages_Dtos_MessageDto } from '../models/IczpNet_Chat_MessageSections_Messages_Dtos_MessageDto';
// import type { IczpNet_Chat_MessageSections_Messages_Dtos_MessageOwnerDto_IczpNet_Chat_Application_Contracts_Version_0_1_1_0_Culture_neutral_PublicKeyToken_null_ } from '../models/IczpNet_Chat_MessageSections_Messages_Dtos_MessageOwnerDto_IczpNet_Chat_Application_Contracts_Version_0_1_1_0_Culture_neutral_PublicKeyToken_null_';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import { PagedResultDto } from '../dtos/PagedResultDto';
import { IczpNet_Chat_MessageSections_Messages_Dtos_MessageOwnerDto } from '../models/IczpNet_Chat_MessageSections_Messages_Dtos_MessageOwnerDto';
import { MessageOwnerDto } from '../dtos';
import { MessageGetListInput } from '../dtos/MessageGetListInput';

export class MessageService {

    /**
     * 获取禁止转发的消息类型
     * @returns IczpNet_Chat_Enums_Dtos_EnumDto Success
     * @throws ApiError
     */
    public static getApiChatMessageDisabledForwardList(): CancelablePromise<Array<IczpNet_Chat_Enums_Dtos_EnumDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/message/disabled-forward-list',
            
        });
    }

    /**
     * 获取一条消息
     * @returns IczpNet_Chat_MessageSections_Messages_Dtos_MessageDto Success
     * @throws ApiError
     */
    public static getApiChatMessageItem({
sessionUnitId,
messageId,
}: {
/**
 * 会话单元Id
 */
sessionUnitId: string,
/**
 * 消息Id
 */
messageId: number,
}): CancelablePromise<IczpNet_Chat_MessageSections_Messages_Dtos_MessageDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/message/item',
            query: {
                'SessionUnitId': sessionUnitId,
                'MessageId': messageId,
            },
            
        });
    }

    /**
     * 获取消息列表
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<IczpNet_Chat_MessageSections_Messages_Dtos_MessageOwnerDto_IczpNet_Chat_Application_Contracts_Version_0_1_1_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiChatMessage({
sessionUnitId,
senderId,
isRemind,
messageType,
isFollowed,
forwardDepth,
quoteDepth,
minMessageId,
maxMessageId,
keyword ,
maxResultCount,
skipCount,
sorting ,
}: MessageGetListInput): CancelablePromise<PagedResultDto<MessageOwnerDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/message',
            query: {
                'SessionUnitId': sessionUnitId,
                'SenderId': senderId,
                'IsRemind': isRemind,
                'MessageType': messageType,
                'IsFollowed': isFollowed,
                'ForwardDepth': forwardDepth,
                'QuoteDepth': quoteDepth,
                'MinMessageId': minMessageId,
                'MaxMessageId': maxMessageId,
                'Keyword': keyword,
                'MaxResultCount': maxResultCount,
                'SkipCount': skipCount,
                'Sorting': sorting,
            },
            
        });
    }

}
