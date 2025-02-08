import {
  Injectable,
  Inject,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { IUserService } from '../interfaces/user-service.interface';
import { RegisterDto } from 'src/modules/auth/dtos/register.dto';
import { User } from '../entities/user.entity';
import {
  IUserRepository,
  UserRepositoryInterface,
} from '../interfaces/user-repository.interface';
import { PasswordUtil } from 'src/core/utils/password.util';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(`${UserRepositoryInterface}`)
    private readonly userRepository: IUserRepository,
  ) {}

  async registerUser(registerUser: RegisterDto): Promise<User> {
    const { email, password } = registerUser;

    try {
      const isUserExist = await this.isUserExistByEmail(email);

      if (isUserExist) {
        return Promise.reject(
          new BadRequestException(
            `An account with email ${email} is already exists.`,
          ),
        );
      }

      const hashedPassword = await PasswordUtil.hashPassword(password);
      registerUser.password = hashedPassword;
      const user = await this.userRepository.createAndGetEntity(registerUser);

      delete user.password;

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async isUserExistByEmail(email: string): Promise<boolean> {
    return await this.userRepository.isExist({ email });
  }

  async getUsrByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userRepository.getOne({ email });
      return user ?? null;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
