import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepositoryInterface } from './interfaces/user-repository.interface';
import { UserRepository } from './repositories/user.repository';
import { UserServiceInterface } from './interfaces/user-service.interface';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: `${UserRepositoryInterface}`,
      useClass: UserRepository,
    },
    {
      provide: `${UserServiceInterface}`,
      useClass: UserService,
    },
  ],
  exports: [
    {
      provide: `${UserServiceInterface}`,
      useClass: UserService,
    },
  ],
})
export class UserModule {}
