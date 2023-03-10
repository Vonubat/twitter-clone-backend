import { DataSourceOptions } from 'typeorm';
import { Tweet } from '../db/entities/tweet.entity';
import { User } from '../db/entities/user.entity';
import { Like } from '../db/entities/like.entity';
import { Migartion1677766976253 } from '../migrations/1677766976253-Migartion';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

const { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const host = DB_HOST;
const port = Number(DB_PORT);
const username = DB_USER;
const password = DB_PASSWORD;
const database = DB_NAME;
const url =
  NODE_ENV === 'production' ? `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}` : undefined;

console.log(NODE_ENV);
console.log(host);
console.log(port);
console.log(username);
console.log(password);
console.log(database);
console.log(url);

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  url,
  entities: [User, Tweet, Like],
  migrations: [Migartion1677766976253],
  synchronize: false,
  logging: true,
  migrationsRun: true,
};
