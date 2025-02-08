import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { AuthUser } from '../interfaces/auth-user.interface';
import {
  AuthServiceInterface,
  IAuthService,
} from '../interfaces/auth-service.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(`${AuthServiceInterface}`)
    private readonly authService: IAuthService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string): Promise<AuthUser> {
    const user = await this.authService.validateUser(username, password);

    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
    };

    return authUser;
  }
}
