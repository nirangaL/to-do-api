import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthServiceInterface } from './interfaces/auth-service.interface';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    {
      provide: `${AuthServiceInterface}`,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
