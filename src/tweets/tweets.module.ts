import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Tweet } from 'src/db/entities/tweet.entity';
import { User } from 'src/db/entities/user.entity';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';

@Module({
  controllers: [TweetsController],
  providers: [TweetsService],
  imports: [TypeOrmModule.forFeature([User, Tweet]), AuthModule],
})
export class TweetsModule {}
