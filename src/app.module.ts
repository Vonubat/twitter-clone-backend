import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './db/entities/tweet.entity';
import { User } from './db/entities/user.entity';
import { Like } from './db/entities/like.entity';
import { TweetsModule } from './tweets/tweets.module';
import { LikesModule } from './likes/likes.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<number>('DB_PORT')),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Tweet, Like],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    TweetsModule,
    LikesModule,
  ],
})
export class AppModule {}
