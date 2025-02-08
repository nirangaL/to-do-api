import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/core/repository';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {
    super(userRepo);
  }
}
