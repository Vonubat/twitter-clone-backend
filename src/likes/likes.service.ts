import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'src/db/entities/like.entity';
import { Tweet } from 'src/db/entities/tweet.entity';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { AddRemoveLikeDto } from './dto/add-remove-like.dto';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Tweet) private tweetRepository: Repository<Tweet>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Like) private likeRepository: Repository<Like>,
  ) {}

  async addRemoveLike(dto: AddRemoveLikeDto): Promise<Like[]> {
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

    const foundedTweet: Tweet | null = await this.tweetRepository.findOne({ where: { tweetId: dto.tweetId } });

    if (!foundedTweet) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Tweet with such id not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const foundedLike: Like | null = await this.likeRepository.findOne({
      where: { user: { userId: dto.userId }, tweet: { tweetId: dto.tweetId } },
    });

    if (foundedLike) {
      const { likeId } = foundedLike;
      await this.likeRepository.delete({ likeId });
    } else {
      const newLike: Like = this.likeRepository.create();
      newLike.user = foundedUser;
      newLike.tweet = foundedTweet;
      await this.likeRepository.save(newLike);
    }

    return this.likeRepository.find({
      where: { tweet: { tweetId: dto.tweetId } },
    });
  }

  async getLikesAndUsersOnCertainTweet(tweetId: string): Promise<Like[]> {
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

    const foundedLikes: Like[] = await this.likeRepository.find({
      where: { tweet: { tweetId } },
      relations: { user: true },
    });

    return foundedLikes;
  }
}
