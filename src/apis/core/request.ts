/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import axios from 'axios';
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosProgressEvent,
} from 'axios';
import FormData from 'form-data';

import { ApiError } from './ApiError';
import type { ApiRequestOptions } from './ApiRequestOptions';
import type { ApiResult } from './ApiResult';
import { CancelablePromise } from './CancelablePromise';
import type { OnCancel } from './CancelablePromise';
import type { OpenAPIConfig } from './OpenAPI';
import { getToken, isTokenUrl, refreshToken } from '../auth/TokenController';
// import { useWindowStore } from '../../stores/windowStore';


let tokenCount: number = 0;
const getTokenValue = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      tokenCount++;
      resolve(tokenCount);
    }, 1000);
  });
};
// Add a request interceptor
axios.interceptors.request.use(
  async config => {
    // Do something before request is sent
    // console.log('axios.interceptors.request', config);
    // const v = await getTokenValue();
    // console.error('tokenValue', v, config);

    try {
      if (!isTokenUrl(config.url)) {
        //   config.headers['Authorization'] = `Bearer ${token}`;
        const token = await getToken();
        if (token) {
          config.headers['Authorization'] = `${token.token_type} ${token.access_token}`;
        }
      }
    } catch (error) {
      throw error;
    }

    return config;
  },
  err => {
    // Do something with request error
    return Promise.reject(err);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log('axios.interceptors.response', response);
    return response;
  },
  err => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(err);
  },
);

export const isDefined = <T>(
  value: T | null | undefined,
): value is Exclude<T, null | undefined> => {
  return value !== undefined && value !== null;
};

export const isString = (value: any): value is string => {
  return typeof value === 'string';
};

export const isStringWithValue = (value: any): value is string => {
  return isString(value) && value !== '';
};

export const isBlob = (value: any): value is Blob => {
  return (
    typeof value === 'object' &&
    typeof value.type === 'string' &&
    typeof value.stream === 'function' &&
    typeof value.arrayBuffer === 'function' &&
    typeof value.constructor === 'function' &&
    typeof value.constructor.name === 'string' &&
    /^(Blob|File)$/.test(value.constructor.name) &&
    /^(Blob|File)$/.test(value[Symbol.toStringTag])
  );
};

export const isFormData = (value: any): value is FormData => {
  return value instanceof FormData;
};

export const isSuccess = (status: number): boolean => {
  return status >= 200 && status < 300;
};

export const base64 = (str: string): string => {
  try {
    return btoa(str);
  } catch (err) {
    // @ts-ignore
    return Buffer.from(str).toString('base64');
  }
};

export const getQueryString = (params: Record<string, any>): string => {
  const qs: string[] = [];

  const append = (key: string, value: any) => {
    qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  };

  const process = (key: string, value: any) => {
    if (isDefined(value)) {
      if (Array.isArray(value)) {
        value.forEach(v => {
          process(key, v);
        });
      } else if (typeof value === 'object') {
        Object.entries(value).forEach(([k, v]) => {
          process(`${key}[${k}]`, v);
        });
      } else {
        append(key, value);
      }
    }
  };

  Object.entries(params).forEach(([key, value]) => {
    process(key, value);
  });

  if (qs.length > 0) {
    return `?${qs.join('&')}`;
  }

  return '';
};

const getUrl = (config: OpenAPIConfig, options: ApiRequestOptions): string => {
  if (options.url.startsWith('blob:http')) {
    return options.url;
  }
  const encoder = config.ENCODE_PATH || encodeURI;

  const path = options.url
    // .replace('/api/chat/', '/api/app/')
    .replace('{api-version}', config.VERSION)
    .replace(/{(.*?)}/g, (substring: string, group: string) => {
      if (options.path?.hasOwnProperty(group)) {
        return encoder(String(options.path[group]));
      }
      return substring;
    });

  const baseUrl = isTokenUrl(options.url) ? config.AUTH_HOST : config.BASE;

  let url = `${path}`;
  if (!/^https?/g.test(url)) {
    url = `${baseUrl}${path}`;
  }
  if (options.query) {
    return `${url}${getQueryString(options.query)}`;
  }
  return url;
};

export const getFormData = (options: ApiRequestOptions): FormData | undefined => {
  if (options.formData) {
    const formData = new FormData();

    const process = (key: string, value: any) => {
      if (isString(value) || isBlob(value)) {
        formData.append(key, value);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    };

    Object.entries(options.formData)
      .filter(([_, value]) => isDefined(value))
      .forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(v => process(key, v));
        } else {
          process(key, value);
        }
      });

    return formData;
  }
  return undefined;
};

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;

export const resolve = async <T>(
  options: ApiRequestOptions,
  resolver?: T | Resolver<T>,
): Promise<T | undefined> => {
  if (typeof resolver === 'function') {
    return (resolver as Resolver<T>)(options);
  }
  return resolver;
};

export const getHeaders = async (
  config: OpenAPIConfig,
  options: ApiRequestOptions,
  formData?: FormData,
): Promise<Record<string, string>> => {
  const token = await resolve(options, config.TOKEN);
  const username = await resolve(options, config.USERNAME);
  const password = await resolve(options, config.PASSWORD);
  const additionalHeaders = await resolve(options, config.HEADERS);
  const formHeaders = (typeof formData?.getHeaders === 'function' && formData?.getHeaders()) || {};

  // const windowStore = useWindowStore();

  const headers = Object.entries({
    // 'app-device-id': windowStore.machineId,
    // 'app-electron': process.electron,
    // Accept: 'application/json',
    ...additionalHeaders,
    ...options.headers,
    ...formHeaders,
  })
    .filter(([_, value]) => isDefined(value))
    .reduce(
      (headers, [key, value]) => ({
        ...headers,
        [key]: String(value),
      }),
      {} as Record<string, string>,
    );

  if (isStringWithValue(token)) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (isStringWithValue(username) && isStringWithValue(password)) {
    const credentials = base64(`${username}:${password}`);
    headers['Authorization'] = `Basic ${credentials}`;
  }

  if (options.body) {
    if (options.mediaType) {
      headers['Content-Type'] = options.mediaType;
    } else if (isBlob(options.body)) {
      headers['Content-Type'] = options.body.type || 'application/octet-stream';
    } else if (isString(options.body)) {
      headers['Content-Type'] = 'text/plain';
    } else if (!isFormData(options.body)) {
      headers['Content-Type'] = 'application/json';
    }
  }

  return headers;
};

export const getRequestBody = (options: ApiRequestOptions): any => {
  if (options.body) {
    return options.body;
  }
  return undefined;
};

export const sendRequest = async <T>(
  config: OpenAPIConfig,
  options: ApiRequestOptions,
  url: string,
  body: any,
  formData: FormData | undefined,
  headers: Record<string, string>,
  onCancel: OnCancel,
  axiosClient: AxiosInstance,
): Promise<AxiosResponse<T>> => {
  const source = axios.CancelToken.source();

  const requestConfig: AxiosRequestConfig = {
    url,
    headers,
    data: body ?? formData,
    method: options.method,
    responseType: options.responseType,
    withCredentials: config.WITH_CREDENTIALS,
    cancelToken: source.token,
    onUploadProgress: options.onUploadProgress,
    onDownloadProgress: options.onDownloadProgress,
  };

  onCancel(() => source.cancel('The user aborted a request.'));

  try {
    return await axiosClient.request(requestConfig);
  } catch (error) {
    const axiosError = error as AxiosError<T>;
    if (axiosError.response) {
      return axiosError.response;
    }
    throw error;
  }
};

export const getResponseHeader = (
  response: AxiosResponse<any>,
  responseHeader?: string,
): string | undefined => {
  if (responseHeader) {
    const content = response.headers[responseHeader];
    if (isString(content)) {
      return content;
    }
  }
  return undefined;
};

export const getResponseBody = (response: AxiosResponse<any>): any => {
  if (response.status !== 204) {
    return response.data;
  }
  return undefined;
};

export const getFileNameFormHeaders = (response: AxiosResponse<any>): string | undefined => {
  const contentDisposition = response.headers['content-disposition'];
  let fileName: string | undefined;
  if (contentDisposition) {
    const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
    if (fileNameMatch?.length === 2) {
      fileName = fileNameMatch[1];
    }
  }
  return fileName;
};

export const catchErrorCodes = (options: ApiRequestOptions, result: ApiResult): void => {
  const errors: Record<number | string, string> = {
    // 200: '服务器成功返回请求的数据。',
    // 201: '新建或修改数据成功。',
    // 202: '一个请求已经进入后台排队（异步任务）。',
    // 204: '删除数据成功。',
    // 400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    ERR_NETWORK: '网络错误或服务不可用',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
    // 400: 'Bad Request',
    // 401: 'Unauthorized',
    // 403: 'Forbidden',
    // 404: 'Not Found',
    // 500: 'Internal Server Error',
    // 502: 'Bad Gateway',
    // 503: 'Service Unavailable',
    ...options.errors,
  };

  const error = errors[result.status];
  if (error) {
    const message = result?.body?.error?.message || error;
    throw new ApiError(options, result, message);
  }

  if (!result.ok) {
    const errorStatus = result.status ?? 'unknown';
    const errorStatusText = result.statusText ?? 'unknown';
    const errorBody = (() => {
      try {
        let message = result.body?.error?.message || JSON.stringify(result.body, null, 2);
        return message;
      } catch (e) {
        return undefined;
      }
    })();

    throw new ApiError(
      options,
      result,
      `Generic Error: status: ${errorStatus}; status text: ${errorStatusText}; body: ${errorBody}`,
    );
  }
};

/**
 * Request method
 * @param config The OpenAPI configuration object
 * @param options The request options from the service
 * @param axiosClient The axios client instance to use
 * @returns CancelablePromise<T>
 * @throws ApiError
 */
export const request = <T>(
  config: OpenAPIConfig,
  options: ApiRequestOptions,
  axiosClient: AxiosInstance = axios,
): CancelablePromise<T> => {
  return new CancelablePromise(async (resolve, reject, onCancel) => {
    try {
      const url = getUrl(config, options);
      // console.log('request url', url);
      const formData = getFormData(options);
      const body = getRequestBody(options);
      const headers = await getHeaders(config, options, formData);

      if (!onCancel.isCancelled) {
        const response = await sendRequest<T>(
          config,
          options,
          url,
          body,
          formData,
          headers,
          onCancel,
          axiosClient,
        );
        // console.log('response', response);

        const responseBody = getResponseBody(response);
        const responseHeader = getResponseHeader(response, options.responseHeader);

        const result: ApiResult = {
          url,
          ok: isSuccess(response.status),
          status: response.status,
          statusText: response.statusText,
          body: responseHeader ?? responseBody,
        };
        if (options.responseType == 'blob') {
          var fileName = getFileNameFormHeaders(response);
          result.body.fileName = fileName;
        }

        catchErrorCodes(options, result);

        resolve(options.responseAll ? { result, response } : result.body);
      }
    } catch (error) {
      reject(error);
    }
  });
};
