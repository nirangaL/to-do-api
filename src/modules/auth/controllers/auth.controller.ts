import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';
import { RegisterDto } from '../dtos/register.dto';
import {
  AuthServiceInterface,
  IAuthService,
} from '../interfaces/auth-service.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(`${AuthServiceInterface}`)
    private readonly authService: IAuthService,
  ) {}
  @Post('register')
  @ApiOperation({ summary: 'new user sign-up' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully sign up',
  })
  @ApiBody({ type: RegisterDto })
  @ApiOperation({ summary: 'Register a new user' })
  @HttpCode(HttpStatus.OK)
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    return await this.authService.register(registerDto);
  }
}
