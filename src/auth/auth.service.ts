import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { Token } from 'src/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async login(dto: LoginUserDto): Token {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async signup(dto: CreateUserDto): Token {
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.createUser({ ...dto, password: hashPassword });
    return this.generateToken(user);
  }

  private async generateToken(user: User): Token {
    const payload = { username: user.username, id: user.userId };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(dto: LoginUserDto): Promise<User> {
    const user: User | null = await this.userRepository.findOne({
      where: { username: dto.username },
      select: { password: true, username: true, userId: true },
    });

    if (!user) {
      throw new UnauthorizedException({ message: 'Cant find User with such username or password' });
    }

    const isPasswordEquals: boolean = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordEquals) {
      throw new UnauthorizedException({ message: 'Cant find User with such username or password' });
    }

    return user;
  }
}
