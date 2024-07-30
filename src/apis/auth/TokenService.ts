import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import type { TokenDto, TokenCreateInput, RefreshTokenInput } from './dto';
import { toQueryString } from '../../utils/utils';
import { TOKEN_URL } from './TokenController';
import type { TokenCodeInput } from './dto/TokenCodeInput';

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
  public static RefreshToken(
    input: RefreshTokenInput
  ): CancelablePromise<TokenDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: TOKEN_URL,
      mediaType: 'application/x-www-form-urlencoded',
      // body: toQueryString(input),
    });
  }
}
