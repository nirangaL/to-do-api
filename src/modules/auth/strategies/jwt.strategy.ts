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
import configuration from 'src/core/config/configuration';
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
      secretOrKey: configuration().app.jwtSecret,
    });
  }

  validate(payload: { sub: string; email: string }): AuthUser {
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
