import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';
import { RegisterDto } from '../dtos/register.dto';
import {
  AuthServiceInterface,
  IAuthService,
} from '../interfaces/auth-service.interface';
import { LocalAuthGuard } from '../guards';
import { LoginDto } from '../dtos/login.dto';
import { IRequestWithUser } from '../interfaces/request.interface';
import { IToken } from '../interfaces/token.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(`${AuthServiceInterface}`)
    private readonly authService: IAuthService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'New user registration' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully registered',
  })
  @ApiBody({ type: RegisterDto })
  @HttpCode(HttpStatus.OK)
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    return await this.authService.register(registerDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully Login in',
  })
  @ApiBody({ type: LoginDto })
  @HttpCode(HttpStatus.OK)
  login(@Req() req: IRequestWithUser): IToken {
    const { user } = req;
    return this.authService.login(user);
  }
}
