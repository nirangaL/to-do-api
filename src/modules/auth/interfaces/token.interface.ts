export interface ITokenUser {
  sub: string;
  email?: string;
}

/**
 * JWT token response
 */
export interface IToken {
  access_token: string;
  access_token_expires_in: string;
}

/**
 * JWT access token response
 */
export interface IAccessTokenResponse {
  access_token: string;
  access_token_expires_in: string;
}
