import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { TokenPayload } from '../types';
import { User } from '../db/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(registrationData: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);

    const createdUser = await this.usersService.createUser({
      ...registrationData,
      password: hashedPassword,
    });

    return createdUser;
  }

  public getCookieWithJwtToken(userId: string): string {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; SameSite=None; Secure; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  public async getAuthenticatedUser(username: string, plainTextPassword: string): Promise<User> {
    try {
      const user = await this.usersService.getUserByUsername(username);

      await this.verifyPassword(plainTextPassword, user.password);

      return user;
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<void> {
    const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);

    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }
}
