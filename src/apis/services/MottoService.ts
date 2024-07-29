/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IczpNet_Chat_Mottos_Dtos_MottoCreateInput } from '../models/IczpNet_Chat_Mottos_Dtos_MottoCreateInput';
import type { IczpNet_Chat_Mottos_Dtos_MottoDetailDto } from '../models/IczpNet_Chat_Mottos_Dtos_MottoDetailDto';
// import type { IczpNet_Chat_Mottos_Dtos_MottoDto_IczpNet_Chat_Application_Contracts_Version_0_1_1_0_Culture_neutral_PublicKeyToken_null_ } from '../models/IczpNet_Chat_Mottos_Dtos_MottoDto_IczpNet_Chat_Application_Contracts_Version_0_1_1_0_Culture_neutral_PublicKeyToken_null_';
import type { IczpNet_Chat_Mottos_Dtos_MottoUpdateInput } from '../models/IczpNet_Chat_Mottos_Dtos_MottoUpdateInput';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MottoService {

    /**
     * 新增
     * @returns IczpNet_Chat_Mottos_Dtos_MottoDetailDto Success
     * @throws ApiError
     */
    public static postApiChatMotto({
ownerId,
requestBody,
}: {
/**
 * 聊天对象Id
 */
ownerId: number,
requestBody?: IczpNet_Chat_Mottos_Dtos_MottoCreateInput,
}): CancelablePromise<IczpNet_Chat_Mottos_Dtos_MottoDetailDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/motto',
            query: {
                'ownerId': ownerId,
            },
            body: requestBody,
            mediaType: 'application/json',
            
        });
    }

    /**
     * 获取列表
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<IczpNet_Chat_Mottos_Dtos_MottoDto_IczpNet_Chat_Application_Contracts_Version_0_1_1_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiChatMotto({
ownerId,
keyword = null,
maxResultCount,
skipCount,
sorting = null,
}: {
/**
 * 聊天对象Id
 */
ownerId: number,
/**
 * 关键字(支持拼音)
 */
keyword?: string | null,
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
sorting?: string | null,
}): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/motto',
            query: {
                'ownerId': ownerId,
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
    public static postApiChatMottoDeleteBy({
ownerId,
id,
}: {
/**
 * 聊天对象Id
 */
ownerId: number,
/**
 * 主建Id
 */
id: string,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/motto/{id}/delete-by/{ownerId}',
            path: {
                'ownerId': ownerId,
                'id': id,
            },
            
        });
    }

    /**
     * 删除多条数据
     * @returns any Success
     * @throws ApiError
     */
    public static postApiChatMottoDeleteMany({
ownerId,
requestBody,
}: {
/**
 * 聊天对象Id
 */
ownerId: number,
requestBody?: Array<string>,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/motto/delete-many/{ownerId}',
            path: {
                'ownerId': ownerId,
            },
            body: requestBody,
            mediaType: 'application/json',
            
        });
    }

    /**
     * 获取一条数据
     * @returns IczpNet_Chat_Mottos_Dtos_MottoDetailDto Success
     * @throws ApiError
     */
    public static getApiChatMotto1({
ownerId,
id,
}: {
/**
 * 聊天对象Id
 */
ownerId: number,
/**
 * 主建Id
 */
id: string,
}): CancelablePromise<IczpNet_Chat_Mottos_Dtos_MottoDetailDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/motto/{id}',
            path: {
                'id': id,
            },
            query: {
                'ownerId': ownerId,
            },
            
        });
    }

    /**
     * 获取多条数据
     * @returns IczpNet_Chat_Mottos_Dtos_MottoDetailDto Success
     * @throws ApiError
     */
    public static getApiChatMottoMany({
idList,
}: {
/**
 * 主键Id[多个]
 */
idList?: Array<string>,
}): CancelablePromise<Array<IczpNet_Chat_Mottos_Dtos_MottoDetailDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/motto/many',
            query: {
                'idList': idList,
            },
            
        });
    }

    /**
     * 修改
     * @returns IczpNet_Chat_Mottos_Dtos_MottoDetailDto Success
     * @throws ApiError
     */
    public static postApiChatMottoUpdate({
ownerId,
id,
requestBody,
}: {
/**
 * 聊天对象Id
 */
ownerId: number,
/**
 * 主建Id
 */
id: string,
requestBody?: IczpNet_Chat_Mottos_Dtos_MottoUpdateInput,
}): CancelablePromise<IczpNet_Chat_Mottos_Dtos_MottoDetailDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/motto/{id}/update/{ownerId}',
            path: {
                'ownerId': ownerId,
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            
        });
    }

}
