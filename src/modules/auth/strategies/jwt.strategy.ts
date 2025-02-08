import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AuthUser } from '../interfaces/auth-user.interface';
import {
  AuthServiceInterface,
  IAuthService,
} from '../interfaces/auth-service.interface';
import {
  IUserService,
  UserServiceInterface,
} from 'src/modules/user/interfaces/user-service.interface';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(`${UserServiceInterface}`)
    private readonly userService: IUserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET',
    });
  }

  async validate(payload: { sub: number; email: string }): Promise<AuthUser> {
    const user = await this.userService.getUsrByEmail(payload.email);
    if (!user) {
      return Promise.reject(
        new BadRequestException(
          `An account with email ${payload.email} is not exists.`,
        ),
      );
    }
    return {
      id: user.id,
      email: user.email,
    };
  }
}
