// import { CancelablePromise } from '../core/CancelablePromise';

import { TokenService } from './TokenService';
import type { TokenDto, LoginResult, LoginInput } from './dto';
import { GrantTypeEnum } from './dto/GrantTypeEnum';
import { env } from '../../env';
import type { TokenCodeInput } from './dto/TokenCodeInput';

export const TOKEN_KEY: string = env.token_key;

export const TOKEN_URL: string = '/connect/token';

let cacheToken: TokenDto | null = null;

export let isPostToken: boolean = false;

/**
 * 是否TokenUrl
 * @param {string} url 输入
 * @return {*}  {boolean}
 */
export const isTokenUrl = (url?: string): boolean => {
  return url != null && (url == TOKEN_URL || url.endsWith(TOKEN_URL));
};

/**
 * 是否登录
 *
 * @return {*}  {boolean}
 */
export const isLogined = (): boolean => postToken() != null;

/**
 * 登录
 *
 * @param {LoginInput} { username, password }
 * @return {*}  {Promise<LoginResult>}
 */

export const login = ({
  username,
  password,
}: LoginInput): Promise<LoginResult> => {
  return new Promise((resolve, reject) => {
    TokenService.fetchToken({
      client_id: env.client_id,
      client_secret: env.client_secret,
      grant_type: GrantTypeEnum.Password,
      username,
      password,
      scope: 'IM offline_access roles profile phone email address',
    })
      .then(async (token) => {
        token = await handleToken(token, 'fetchToken');
        resolve({
          message: '登录成功',
          success: true,
          detail: token,
        });
      })
      .catch((err) => {
        let message = err?.body?.error_description || err.message;
        console.error('err:', err, JSON.stringify(err));
        reject({
          message: '登录失败:' + message,
          success: false,
          detail: err,
        });
      });
  });
};

/**
 * 登录
 *
 * @param {LoginInput} { username, password }
 * @return {*}  {Promise<LoginResult>}
 */

export const loginByCode = ({
  code,
}: {
  code: string;
}): Promise<LoginResult> => {
  return new Promise((resolve, reject) => {
    TokenService.fetchTokenByCode({
      client_id: env.client_id,
      client_secret: env.client_secret,
      grant_type: GrantTypeEnum.authorization_code,
      code,
      redirect_uri: env.redirect_uri,
    })
      .then(async (token) => {
        token = await handleToken(token, 'fetchTokenByCode');
        resolve({
          message: '登录成功',
          success: true,
          detail: token,
        });
      })
      .catch((err) => {
        let message = err?.body?.error_description || err.message;
        console.error('err:', err, JSON.stringify(err));
        reject({
          message: '登录失败:' + message,
          success: false,
          detail: err,
        });
      });
  });
};

export const getAuthUrl = (args?: { scope: string }) => {
  const { scope } = args || {
    scope: 'address email phone profile roles IM',
  };

  const queryParams: Record<string, string> = {
    client_id: env.client_id,
    redirect_uri: env.redirect_uri,
    response_type: 'code',
    scope,
  };
  if (env.client_secret) {
    queryParams.client_secret = env.client_secret;
  }
  const queryString = new URLSearchParams(queryParams).toString();
  const authUrl = `${env.auth_host}/connect/authorize?${queryString}`;
  console.log('getAuthUrl', authUrl);
  return authUrl;
};

/**
 *
 *
 * @param {TokenDto} token
 * @return {*}  {TokenDto}
 */
export const handleToken = async (
  token: TokenDto,
  caller?: string
): Promise<TokenDto> => {
  token.creation_time = new Date();
  cacheToken = token;
  console.log(`handleToken[${caller}]`, token);
  setStorageToken(JSON.stringify(token));

  // await setAuthorize(token);

  return token;
};

/**
 *
 *
 * @param {TokenDto} token
 * @return {*}
 */
export const refreshToken = async (token: TokenDto): Promise<TokenDto> => {
  console.log('refreshToken', token);
  var newToken = await TokenService.RefreshToken({
    client_id: env.client_id,
    client_secret: env.client_secret,
    refresh_token: token.refresh_token,
    grant_type: GrantTypeEnum.Refresh_token,
  });
  newToken = await handleToken(newToken, 'refreshToken');
  return newToken;
};

/**
 * 获取Token
 *
 * @param {number} [tryCount=10] 重试次数
 * @return {*}  {(Promise<TokenDto | null>)}
 */

export const getToken = (tryCount: number = 10): Promise<TokenDto | null> => {
  return new Promise(async (resolve, reject) => {
    // console.log('getToken', tryCount);
    if (isPostToken) {
      // console.log('isPostToken', isPostToken, tryCount);
      if (tryCount < 0) {
        reject('超过重试次数');
        return;
      }
      setTimeout(async () => {
        // console.log('setTimeout isPostToken', isPostToken);
        tryCount--;
        resolve(await getToken(tryCount));
      }, 1000);
      return;
    }
    isPostToken = true;
    let token = await postToken();
    isPostToken = false;
    resolve(token);
  });
};
/**
 * 获取Token
 *
 * @return {*}  {(Promise<TokenDto | null>)}
 */
export const postToken = async (): Promise<TokenDto | null> => {
  let token = getLocalToken();
  // console.log('postToken 1', token);
  if (token) {
    if (isTokenExpired(token)) {
      token = await refreshToken(token);
    }
  }
  return token;
  // // console.log('postToken 2', token);
  // var ret = await login({
  //   username: 'admin',
  //   password: '********',
  // });
  // // console.log('postToken 3 cacheToken', cacheToken);
  // return ret.detail;
};

/**
 * 存储Token
 *
 * @param {string} value
 */
export const setStorageToken = (value: string): void => {
  localStorage.setItem(TOKEN_KEY, value);
};

/**
 * 获取存储Token
 *
 * @return {*}  {(string | null)}
 */
export const getStorageToken = (): string | null => {
  const tokenValue = localStorage.getItem(TOKEN_KEY);
  return tokenValue;
};

/**
 * 是否过期
 *
 * @param {(TokenDto | null)} token
 * @return {*}  {boolean}
 */
export const isTokenExpired = (token: TokenDto | null): boolean => {
  // console.log('isTokenExpired token', token);
  // return true;

  if (!token) {
    return false;
  }
  const creation_ticks = token.creation_time?.getTime() || 0;
  const diffSeconds = (new Date().getTime() - creation_ticks) / 1000;
  const isExpired = diffSeconds > token.expires_in - 300;
  // console.error('isTokenExpired diffSeconds', diffSeconds, isExpired);
  return isExpired;
};

/**
 * 获取本地Token
 *
 * @return {*}  {(TokenDto | null)}
 */
export const getLocalToken = (): TokenDto | null => {
  let token: TokenDto | null = null;
  if (cacheToken) {
    token = cacheToken;
    // console.log('getLocalToken cacheToken');
  } else {
    let tokenString = getStorageToken();
    if (tokenString) {
      token = JSON.parse(tokenString);
      if (token && token.creation_time) {
        token.creation_time = new Date(token.creation_time);
      }
      cacheToken = token;
    }
  }

  return token;
};
