import { User } from 'src/modules/user/entities/user.entity';
import { RegisterDto } from '../dtos/register.dto';
import { IAuthService } from '../interfaces/auth-service.interface';
import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
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
      const { email } = registerDto;
      const isUserExist = await this.userService.isUserExistByEmail(email);

      if (isUserExist) {
        return Promise.reject(
          new BadRequestException(
            `An account with email ${email} is already exists.`,
          ),
        );
      }

      return await this.userService.registerUser(registerDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
