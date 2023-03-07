import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { RequestWithUser, SimpleMessageResponse } from '../types';
import { User } from '../db/entities/user.entity';
import { LocalAuthenticationGuard } from './guards/local-auth.guard';
import { LoginUserDto } from '../users/dto/login-user.dto';
import JwtAuthenticationGuard from './guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Log In operation (set auth cookie for certain User)' })
  @ApiResponse({
    status: 200,
    description: 'Returns the logged User',
    type: User,
  })
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('/login')
  async login(@Body() _dto: LoginUserDto, @Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.userId);
    request.res?.setHeader('Set-Cookie', cookie);

    return user;
  }

  @ApiOperation({ summary: 'Register operation (create new User and set auth cookie)' })
  @ApiResponse({
    status: 201,
    description: 'Returns the new User',
    type: User,
  })
  @Post('/register')
  async signup(@Body() dto: CreateUserDto, @Req() request: RequestWithUser) {
    const newUser = await this.authService.register(dto);
    const cookie = this.authService.getCookieWithJwtToken(newUser.userId);
    request.res?.setHeader('Set-Cookie', cookie);

    return newUser;
  }

  @ApiSecurity('Authentication')
  @ApiOperation({ summary: 'Log out operation (clear auth cookie for logged User)' })
  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser): SimpleMessageResponse {
    request.res?.setHeader('Set-Cookie', this.authService.getCookieForLogOut());

    return { message: 'Log out successful' };
  }

  @ApiSecurity('Authentication')
  @ApiOperation({ summary: 'Check if the current token is valid and get the data of the currently logged in user' })
  @ApiResponse({
    status: 200,
    description: 'Returns the logged User',
    type: User,
  })
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async authenticate(@Req() request: RequestWithUser) {
    const user = request.user;

    return user;
  }
}
