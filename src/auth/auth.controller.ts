import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Token } from 'src/types';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Log In operation' })
  @ApiResponse({
    status: 201,
    description: 'Return Token',
    schema: {
      example: {
        token: 'string',
      },
    },
  })
  @Post('/login')
  login(@Body() dto: LoginUserDto): Token {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Sign Up operation' })
  @ApiResponse({
    status: 201,
    description: 'Return Token',
    schema: {
      example: {
        token: 'string',
      },
    },
  })
  @Post('/signup')
  signup(@Body() dto: CreateUserDto): Token {
    return this.authService.signup(dto);
  }
}
