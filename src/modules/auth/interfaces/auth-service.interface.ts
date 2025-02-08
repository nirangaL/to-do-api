import { User } from 'src/modules/user/entities/user.entity';
import { RegisterDto } from '../dtos/register.dto';
export const AuthServiceInterface = 'IAuthService';
export interface IAuthService {
  register(registerDto: RegisterDto): Promise<User>;
}
