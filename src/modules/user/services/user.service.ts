import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { IUserService } from '../interfaces/user-service.interface';
import { RegisterDto } from 'src/modules/auth/dtos/register.dto';
import { User } from '../entities/user.entity';
import {
  IUserRepository,
  UserRepositoryInterface,
} from '../interfaces/user-repository.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(`${UserRepositoryInterface}`)
    private readonly userRepository: IUserRepository,
  ) {}

  async registerUser(registerUser: RegisterDto): Promise<User> {
    try {
      return await this.userRepository.createAndGetEntity(registerUser);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async isUserExistByEmail(email: string): Promise<boolean> {
    return await this.userRepository.isExist({ email });
  }
}
