import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import type { TokenDto, TokenCreateInput, RefreshTokenInput } from './dto';
import { toQueryString } from '../../utils/utils';
// import { TOKEN_URL, TOKEN_LOGOUT_URL } from './TokenController';
import type { TokenCodeInput } from './dto/TokenCodeInput';
import { env } from '../../env';
import { min } from '@pureadmin/utils';

export const TOKEN_KEY: string = env.token_key;

export const TOKEN_URL: string = '/connect/token';

export const TOKEN_LOGOUT_URL: string = '/connect/logout';

export class TokenService {
  /**
   * 获取Token
   *
   * @static
   * @param {TokenCreateInput} input
   * @return {*}  {CancelablePromise<TokenDto>}
   * @memberof TokenService
   */
  public static fetchToken(
    input: TokenCreateInput
  ): CancelablePromise<TokenDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: TOKEN_URL,
      mediaType: 'application/x-www-form-urlencoded',
      body: toQueryString(input),
    });
  }

  /**
   * 获取Token
   *
   * @static
   * @param {TokenCodeInput} input
   * @return {*}  {CancelablePromise<TokenDto>}
   * @memberof TokenService
   */
  public static fetchTokenByCode(
    input: TokenCodeInput
  ): CancelablePromise<TokenDto> {
    console.log('TokenCodeInput', input);

    return __request(OpenAPI, {
      method: 'POST',
      url: TOKEN_URL,
      mediaType: 'application/x-www-form-urlencoded',
      body: toQueryString(input),
    });
  }

  /**
   * 刷新Token
   *
   * @static
   * @param {RefreshTokenInput} input
   * @return {*}  {CancelablePromise<TokenDto>}
   * @memberof TokenService
   */
  public static refreshToken(
    input: RefreshTokenInput
  ): CancelablePromise<TokenDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: TOKEN_URL,
      mediaType: 'application/x-www-form-urlencoded',
      body: toQueryString(input),
    });
  }

  /**
   * 刷新Token
   *
   * @static
   * @return {*}  {CancelablePromise<void>}
   * @memberof TokenService
   */
  public static logout(): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'GET',
      url: TOKEN_LOGOUT_URL,
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      mediaType: 'application/x-www-form-urlencoded',
      // body: toQueryString({}),
    });
  }
}
