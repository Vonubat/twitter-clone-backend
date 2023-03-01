import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from 'src/db/entities/tweet.entity';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
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

    if (foundedUser) {
      newTweet.user = foundedUser;

      return this.tweetRepository.save(newTweet);
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'User with such id not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async deleteTweetById(tweetId: string): Promise<string> {
    const foundedTweet: Tweet | null = await this.tweetRepository.findOne({ where: { tweetId } });

    if (foundedTweet) {
      await this.tweetRepository.delete({ tweetId });

      return `Tweet ${tweetId} was deleted successfully`;
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Tweet with such id not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async updateTweetById(tweetId: string, dto: UpdateTweetDto): Promise<Tweet> {
    const foundedTweet: Tweet | null = await this.tweetRepository.findOne({
      where: { tweetId },
      relations: { user: true },
    });

    if (foundedTweet) {
      foundedTweet.text = dto.text;

      return this.tweetRepository.save(foundedTweet);
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Tweet with such id not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async getTweetListById(userId: string): Promise<Tweet[]> {
    const foundedUser: User | null = await this.userRepository.findOne({ where: { userId } });

    if (foundedUser) {
      const foundedTweets: Tweet[] = await this.tweetRepository.find({
        where: {
          user: {
            userId,
          },
        },
      });

      return foundedTweets;
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'User with such id not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
