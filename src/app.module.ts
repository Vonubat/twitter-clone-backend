import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetsModule } from './tweets/tweets.module';
import { LikesModule } from './likes/likes.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmAsyncConfig } from './config/typeorm-config';

@Module({
  controllers: [],
  providers: [],
  imports: [TypeOrmModule.forRootAsync(typeOrmAsyncConfig), UsersModule, TweetsModule, LikesModule, AuthModule],
})
export class AppModule {}
