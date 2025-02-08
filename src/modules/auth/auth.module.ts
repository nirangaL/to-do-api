import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthServiceInterface } from './interfaces/auth-service.interface';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, LocalStrategy } from './strategies';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET',
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: `${AuthServiceInterface}`,
      useClass: AuthService,
    },
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
