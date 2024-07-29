/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IczpNet_Chat_SessionSections_SessionTags_Dtos_SessionTagCreateInput } from '../models/IczpNet_Chat_SessionSections_SessionTags_Dtos_SessionTagCreateInput';
import type { IczpNet_Chat_SessionSections_SessionTags_Dtos_SessionTagDetailDto } from '../models/IczpNet_Chat_SessionSections_SessionTags_Dtos_SessionTagDetailDto';
// import type { IczpNet_Chat_SessionSections_SessionTags_Dtos_SessionTagDto_IczpNet_Chat_Application_Contracts_Version_0_1_1_0_Culture_neutral_PublicKeyToken_null_ } from '../models/IczpNet_Chat_SessionSections_SessionTags_Dtos_SessionTagDto_IczpNet_Chat_Application_Contracts_Version_0_1_1_0_Culture_neutral_PublicKeyToken_null_';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SessionTagService {

    /**
     * 创建会话标签
     * @returns IczpNet_Chat_SessionSections_SessionTags_Dtos_SessionTagDetailDto Success
     * @throws ApiError
     */
    public static postApiChatSessionTag({
requestBody,
}: {
requestBody?: IczpNet_Chat_SessionSections_SessionTags_Dtos_SessionTagCreateInput,
}): CancelablePromise<IczpNet_Chat_SessionSections_SessionTags_Dtos_SessionTagDetailDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/session-tag',
            body: requestBody,
            mediaType: 'application/json',
            
        });
    }

    /**
     * 获取列表
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<IczpNet_Chat_SessionSections_SessionTags_Dtos_SessionTagDto_IczpNet_Chat_Application_Contracts_Version_0_1_1_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiChatSessionTag({
sessionId,
keyword,
maxResultCount,
skipCount,
sorting,
}: {
/**
 * 会话单元Id
 */
sessionId?: string,
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
            url: '/api/chat/session-tag',
            query: {
                'SessionId': sessionId,
                'Keyword': keyword,
                'MaxResultCount': maxResultCount,
                'SkipCount': skipCount,
                'Sorting': sorting,
            },
            
        });
    }

    /**
     * 删除一条数据
     * @returns any Success
     * @throws ApiError
     */
    public static postApiChatSessionTagDelete({
id,
}: {
/**
 * 主键Id
 */
id: string,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/session-tag/{id}/delete',
            path: {
                'id': id,
            },
            
        });
    }

    /**
     * 删除多条数据
     * @returns any Success
     * @throws ApiError
     */
    public static postApiChatSessionTagDeleteMany({
requestBody,
}: {
/**
 * 主键Id[多个]
 */
requestBody?: Array<string>,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/session-tag/delete-many',
            body: requestBody,
            mediaType: 'application/json',
            
        });
    }

    /**
     * 获取一条记录 Get
     * @returns IczpNet_Chat_SessionSections_SessionTags_Dtos_SessionTagDetailDto Success
     * @throws ApiError
     */
    public static getApiChatSessionTag1({
id,
}: {
/**
 * 主键Id
 */
id: string,
}): CancelablePromise<IczpNet_Chat_SessionSections_SessionTags_Dtos_SessionTagDetailDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/session-tag/{id}',
            path: {
                'id': id,
            },
            
        });
    }

    /**
     * 获取多条数据
     * @returns IczpNet_Chat_SessionSections_SessionTags_Dtos_SessionTagDetailDto Success
     * @throws ApiError
     */
    public static getApiChatSessionTagMany({
idList,
}: {
/**
 * 主键Id[多个]
 */
idList?: Array<string>,
}): CancelablePromise<Array<IczpNet_Chat_SessionSections_SessionTags_Dtos_SessionTagDetailDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/session-tag/many',
            query: {
                'idList': idList,
            },
            
        });
    }

}
