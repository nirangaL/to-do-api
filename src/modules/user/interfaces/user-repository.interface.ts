import { IBaseRepository } from 'src/core/repository';
import { User } from '../entities/user.entity';

export const UserRepositoryInterface = 'IUserRepository';
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUserRepository extends IBaseRepository<User> {}
