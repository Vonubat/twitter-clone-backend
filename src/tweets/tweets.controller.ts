import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { Tweet } from 'src/db/entities/tweet.entity';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { DeleteTweetDto } from './dto/delete-tweet.dto';
import { TweetsService } from './tweets.service';

@ApiTags('Tweets')
@Controller('tweets')
export class TweetsController {
  constructor(private tweetsService: TweetsService) {}

  @ApiOperation({ summary: 'Create new Tweet' })
  @ApiResponse({ status: 201, type: Tweet })
  @Post()
  create(@Body() dto: CreateTweetDto): Promise<Tweet> {
    return this.tweetsService.createTweet(dto);
  }

  @ApiOperation({ summary: 'Delete Tweet' })
  @ApiResponse({ status: 200, type: String })
  @ApiProperty({
    type: String,
  })
  @Delete(':tweetId')
  delete(
    @Param()
    params: DeleteTweetDto,
  ): Promise<string> {
    return this.tweetsService.deleteTweet(params.tweetId);
  }
}
