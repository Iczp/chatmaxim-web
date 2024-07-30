import type { TokenInputBase } from './TokenInputBase';

export type TokenCodeInput = TokenInputBase &  {
  /**
   *authorization_code
   *
   * @type {(string)}
   * @memberof TokenCreateInput
   */
  code: string;

  /**
   *authorization_code
   *
   * @type {(SVGStringList)}
   * @memberof TokenCreateInput
   */
  redirect_uri: string;
};
