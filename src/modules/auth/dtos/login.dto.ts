import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @ApiProperty({
    description: 'The password for the user',
    example: 'securePassword123',
    minLength: 8,
  })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
