import { DataSourceOptions } from 'typeorm';
import { Tweet } from '../db/entities/tweet.entity';
import { User } from '../db/entities/user.entity';
import { Like } from '../db/entities/like.entity';
import { Migartion1677766976253 } from '../migrations/1677766976253-Migartion';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [User, Tweet, Like],
  migrations: [Migartion1677766976253],
  synchronize: false,
  logging: true,
  migrationsRun: true,
};
