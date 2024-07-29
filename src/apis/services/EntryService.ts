/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IczpNet_Chat_ChatObjects_Dtos_ChatObjectDetailDto } from '../models/IczpNet_Chat_ChatObjects_Dtos_ChatObjectDetailDto';
import type { IczpNet_Chat_SessionUnits_Dtos_SessionUnitDestinationDetailDto } from '../models/IczpNet_Chat_SessionUnits_Dtos_SessionUnitDestinationDetailDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class EntryService {

    /**
     * 设置聊天对象条目
     * @returns IczpNet_Chat_ChatObjects_Dtos_ChatObjectDetailDto Success
     * @throws ApiError
     */
    public static postApiChatEntrySetForChatObject({
ownerId,
requestBody,
}: {
/**
 * 聊天对象Id
 */
ownerId: number,
/**
 * {entryNameId:["v1","v2"]}
 */
requestBody: Record<string, Array<string>>,
}): CancelablePromise<IczpNet_Chat_ChatObjects_Dtos_ChatObjectDetailDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/entry/set-for-chat-object/{ownerId}',
            path: {
                'ownerId': ownerId,
            },
            body: requestBody,
            mediaType: 'application/json',
            
        });
    }

    /**
     * 设置会话单元Id条目值
     * @returns IczpNet_Chat_SessionUnits_Dtos_SessionUnitDestinationDetailDto Success
     * @throws ApiError
     */
    public static postApiChatEntrySetForSessionUnit({
sessionUnitId,
requestBody,
}: {
/**
 * 会话单元Id
 */
sessionUnitId: string,
/**
 * {entryNameId:["v1","v2"]}
 */
requestBody: Record<string, Array<string>>,
}): CancelablePromise<IczpNet_Chat_SessionUnits_Dtos_SessionUnitDestinationDetailDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/entry/set-for-session-unit/{sessionUnitId}',
            path: {
                'sessionUnitId': sessionUnitId,
            },
            body: requestBody,
            mediaType: 'application/json',
            
        });
    }

}
