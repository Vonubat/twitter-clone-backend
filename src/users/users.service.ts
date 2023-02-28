import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  createUser(dto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(dto);
    return this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getUserByUsername(username: string): Promise<User> {
    const users = await this.userRepository.find({
      where: {
        username,
      },
    });
    return users[0];
  }
}
