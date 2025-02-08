import { User } from 'src/modules/user/entities/user.entity';

export interface ITokenUser {
  sub: string;
  email?: string;
}

/**
 * JWT token response
 */
export interface ITokenResponse {
  access_token: string;
  access_token_expires_in: string;
  refresh_token: string;
  refresh_token_expires_in: string;
  sub?: string;
  user?: User;
}

/**
 * JWT access token response
 */
export interface IAccessTokenResponse {
  access_token: string;
  access_token_expires_in: string;
}
