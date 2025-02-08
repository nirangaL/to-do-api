import { User } from 'src/modules/user/entities/user.entity';
import { RegisterDto } from '../dtos/register.dto';
import { IToken } from './token.interface';
export const AuthServiceInterface = 'IAuthService';
export interface IAuthService {
  register(registerDto: RegisterDto): Promise<User>;
  login(user: User): IToken;
  validateUser(email: string, password: string): Promise<User>;
}
