import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { TweetsService } from '../tweets/tweets.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { UpdateBgImageDto } from './dto/update-bgImage.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly tweetsService: TweetsService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const foundedUser: User | null = await this.userRepository.findOne({
      where: {
        username: dto.username,
      },
    });

    if (foundedUser) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User with such username is exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser: User = this.userRepository.create(dto);
    await this.userRepository.save(newUser);
    await this.tweetsService.createInitialTweet(newUser);

    return newUser;
  }

  async getAllUsers(): Promise<User[]> {
    const users: User[] = await this.userRepository.find();

    return users;
  }

  async getUserByUsername(username: string): Promise<User> {
    const foundedUser: User | null = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    if (!foundedUser) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User with such username not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return foundedUser;
  }

  async getById(userId: string): Promise<User> {
    const foundedUser: User | null = await this.userRepository.findOne({
      where: { userId },
      relations: {
        tweets: true,
        likes: {
          tweet: true,
        },
      },
    });

    if (!foundedUser) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User with this id does not exist',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return foundedUser;
  }

  async updateUserAvatar(dto: UpdateAvatarDto, user: User): Promise<User> {
    const foundedUser: User | null = await this.userRepository.findOne({
      where: {
        userId: user.userId,
      },
    });

    if (!foundedUser) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User with this id does not exist',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    foundedUser.avatar = dto.avatar;

    return this.userRepository.save(foundedUser);
  }

  async updateUserBgImage(dto: UpdateBgImageDto, user: User): Promise<User> {
    const foundedUser: User | null = await this.userRepository.findOne({
      where: {
        userId: user.userId,
      },
    });

    if (!foundedUser) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User with this id does not exist',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    foundedUser.bgImage = dto.bgImage;

    return this.userRepository.save(foundedUser);
  }
}
