import { User } from 'src/modules/user/entities/user.entity';
import { RegisterDto } from '../dtos/register.dto';
import { IAuthService } from '../interfaces/auth-service.interface';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import {
  IUserService,
  UserServiceInterface,
} from 'src/modules/user/interfaces/user-service.interface';

export class AuthService implements IAuthService {
  constructor(
    @Inject(`${UserServiceInterface}`)
    private readonly userService: IUserService,
  ) {}
  async register(registerDto: RegisterDto): Promise<User> {
    try {
      return await this.userService.registerUser(registerDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
