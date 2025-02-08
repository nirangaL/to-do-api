import { RegisterDto } from 'src/modules/auth/dtos/register.dto';
import { User } from '../entities/user.entity';

export const UserServiceInterface = 'IUserService';
export interface IUserService {
  registerUser(registerUser: RegisterDto): Promise<User>;
  isUserExistByEmail(email: string): Promise<boolean>;
  getUsrByEmail(email: string): Promise<User | null>;
}
