import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from 'src/db/entities/tweet.entity';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { SimpleMessageResponse } from '../types';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';

@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(Tweet) private tweetRepository: Repository<Tweet>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createTweet(dto: CreateTweetDto): Promise<Tweet> {
    const newTweet: Tweet = this.tweetRepository.create(dto);
    const foundedUser: User | null = await this.userRepository.findOne({ where: { userId: dto.userId } });

    if (!foundedUser) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User with such id not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    newTweet.user = foundedUser;

    return this.tweetRepository.save(newTweet);
  }

  async deleteTweetById(tweetId: string): SimpleMessageResponse {
    const foundedTweet: Tweet | null = await this.tweetRepository.findOne({ where: { tweetId } });

    if (!foundedTweet) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Tweet with such id not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.tweetRepository.delete({ tweetId });

    return { message: `Tweet ${tweetId} was deleted successfully` };
  }

  async updateTweetById(tweetId: string, dto: UpdateTweetDto): Promise<Tweet> {
    const foundedTweet: Tweet | null = await this.tweetRepository.findOne({
      where: { tweetId },
      relations: { user: true },
    });

    if (!foundedTweet) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Tweet with such id not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    foundedTweet.text = dto.text;

    return this.tweetRepository.save(foundedTweet);
  }

  async getTweetListById(userId: string): Promise<Tweet[]> {
    const foundedUser: User | null = await this.userRepository.findOne({ where: { userId } });

    if (!foundedUser) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User with such id not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const foundedTweets: Tweet[] = await this.tweetRepository.find({
      where: {
        user: {
          userId,
        },
      },
    });

    return foundedTweets;
  }
}
