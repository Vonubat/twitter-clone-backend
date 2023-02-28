import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { Tweet } from './db/entities/tweet.entity';
import { User } from './db/entities/user.entity';
import { TweetsFactory } from './db/factories/tweets.factory';
import { UsersFactory } from './db/factories/users.factory';
import { MainSeeder } from './db/seeding/main.seeder';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [User, Tweet],
  // additional config options brought by typeorm-extension
  factories: [UsersFactory, TweetsFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
