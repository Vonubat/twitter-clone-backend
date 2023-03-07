import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiProperty, ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Tweet } from 'src/db/entities/tweet.entity';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { GetTweetParams } from './params/get-tweet.params';
import { UpdateDeleteTweetParams } from './params/update-delete-tweet.params';
import { TweetsService } from './tweets.service';

@ApiTags('Tweets')
@Controller('tweets')
export class TweetsController {
  constructor(private tweetsService: TweetsService) {}

  @ApiSecurity('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create new Tweet' })
  @ApiResponse({ status: 201, description: 'Return created Tweet', type: Tweet })
  @Post()
  create(@Body() dto: CreateTweetDto): Promise<Tweet> {
    return this.tweetsService.createTweet(dto);
  }

  @ApiSecurity('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete Tweet' })
  @ApiResponse({ status: 200, description: 'Return message', type: String })
  @ApiProperty({
    type: String,
  })
  @Delete(':tweetId')
  delete(
    @Param()
    params: UpdateDeleteTweetParams,
  ): Promise<string> {
    return this.tweetsService.deleteTweetById(params.tweetId);
  }

  @ApiSecurity('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update Tweet' })
  @ApiResponse({ status: 200, description: 'Return updated Tweet', type: Tweet })
  @ApiProperty({
    type: String,
  })
  @Put(':tweetId')
  update(
    @Param()
    params: UpdateDeleteTweetParams,
    @Body() dto: UpdateTweetDto,
  ): Promise<Tweet> {
    return this.tweetsService.updateTweetById(params.tweetId, dto);
  }

  @ApiOperation({ summary: 'Get list of User Tweets' })
  @ApiResponse({ status: 200, description: 'Return array of User Tweets', type: [Tweet] })
  @ApiProperty({
    type: String,
  })
  @Get(':userId')
  get(
    @Param()
    params: GetTweetParams,
  ): Promise<Tweet[]> {
    return this.tweetsService.getTweetListById(params.userId);
  }
}
