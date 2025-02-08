import { User } from 'src/modules/user/entities/user.entity';
import { RegisterDto } from '../dtos/register.dto';
import { IAuthService } from '../interfaces/auth-service.interface';
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  IUserService,
  UserServiceInterface,
} from 'src/modules/user/interfaces/user-service.interface';
import { IToken, ITokenUser } from '../interfaces/token.interface';
import { JwtService } from '@nestjs/jwt';
import { PasswordUtil } from 'src/core/utils/password.util';

import * as dotenv from 'dotenv';
dotenv.config();

export class AuthService implements IAuthService {
  constructor(
    @Inject(`${UserServiceInterface}`)
    private readonly userService: IUserService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto): Promise<User> {
    try {
      return await this.userService.registerUser(registerDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  login(user: User): IToken {
    return this.getGeneratedAuthTokens(user);
  }

  /**
   * Get access
   */
  public getGeneratedAuthTokens(user: User): IToken {
    const payload: ITokenUser = {
      sub: user.id,
      email: user.email,
    };

    const atExpireTime = process.env.JWT_SECRET_EXPS;

    const accessToken: string = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: 36000,
    });

    return {
      access_token: accessToken,
      access_token_expires_in: `${atExpireTime}s`,
    } as IToken;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.getUsrByEmail(email);

    if (!user) {
      return Promise.reject(
        new BadRequestException(
          `An account with email ${email} is not exists.`,
        ),
      );
    }

    if (!user.password) {
      return Promise.reject(new ForbiddenException('Invalid Credentials'));
    }

    const isMatch = await PasswordUtil.comparePassword(password, user.password);

    if (!isMatch) {
      return Promise.reject(new ForbiddenException('Invalid Credentials'));
    }

    return user;
  }
}
