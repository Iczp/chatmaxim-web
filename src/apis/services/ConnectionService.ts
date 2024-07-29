/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IczpNet_Chat_Connections_Dtos_ConnectionCreateInput } from '../models/IczpNet_Chat_Connections_Dtos_ConnectionCreateInput';
import type { IczpNet_Chat_Connections_Dtos_ConnectionDto } from '../models/IczpNet_Chat_Connections_Dtos_ConnectionDto';
// import type { IczpNet_Chat_Connections_Dtos_ConnectionDto_IczpNet_Chat_Application_Contracts_Version_0_1_1_0_Culture_neutral_PublicKeyToken_null_ } from '../models/IczpNet_Chat_Connections_Dtos_ConnectionDto_IczpNet_Chat_Application_Contracts_Version_0_1_1_0_Culture_neutral_PublicKeyToken_null_';
import type { IczpNet_Chat_Connections_Dtos_GetOnlineCountOutput } from '../models/IczpNet_Chat_Connections_Dtos_GetOnlineCountOutput';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ConnectionService {

    /**
     * @returns string Success
     * @throws ApiError
     */
    public static postApiChatConnectionActive({
id,
ticks,
}: {
id: string,
ticks?: string,
}): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/connection/{id}/active',
            path: {
                'id': id,
            },
            query: {
                'ticks': ticks,
            },
            
        });
    }

    /**
     * @returns IczpNet_Chat_Connections_Dtos_ConnectionDto Success
     * @throws ApiError
     */
    public static postApiChatConnection({
requestBody,
}: {
requestBody?: IczpNet_Chat_Connections_Dtos_ConnectionCreateInput,
}): CancelablePromise<IczpNet_Chat_Connections_Dtos_ConnectionDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/connection',
            body: requestBody,
            mediaType: 'application/json',
            
        });
    }

    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<IczpNet_Chat_Connections_Dtos_ConnectionDto_IczpNet_Chat_Application_Contracts_Version_0_1_1_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiChatConnection({
keyword,
maxResultCount,
skipCount,
sorting,
}: {
/**
 * 关键字(支持拼音)
 */
keyword?: string,
/**
 * 显示数量
 */
maxResultCount?: number,
/**
 * 跳过数量
 */
skipCount?: number,
/**
 * 排序
 */
sorting?: string,
}): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/connection',
            query: {
                'Keyword': keyword,
                'MaxResultCount': maxResultCount,
                'SkipCount': skipCount,
                'Sorting': sorting,
            },
            
        });
    }

    /**
     * @returns IczpNet_Chat_Connections_Dtos_ConnectionDto Success
     * @throws ApiError
     */
    public static getApiChatConnection1({
id,
}: {
id: string,
}): CancelablePromise<IczpNet_Chat_Connections_Dtos_ConnectionDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/connection/{id}',
            path: {
                'id': id,
            },
            
        });
    }

    /**
     * @returns IczpNet_Chat_Connections_Dtos_GetOnlineCountOutput Success
     * @throws ApiError
     */
    public static getApiChatConnectionOnlineCount(): CancelablePromise<IczpNet_Chat_Connections_Dtos_GetOnlineCountOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/connection/online-count',
            
        });
    }

}
