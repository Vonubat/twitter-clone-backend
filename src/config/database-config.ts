import { DataSourceOptions } from 'typeorm';
import { Tweet } from '../db/entities/tweet.entity';
import { User } from '../db/entities/user.entity';
import { Like } from '../db/entities/like.entity';
import { Migartion1677766976253 } from '../migrations/1677766976253-Migartion';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

const dev = 'development';
const prod = 'production';

const {
  NODE_ENV = dev,
  DB_HOST,
  PGHOST,
  DB_PORT,
  PGPORT,
  DB_USER,
  PGUSER,
  DB_PASSWORD,
  PGPASSWORD,
  DB_NAME,
  PGDATABASE,
} = process.env;

const host = NODE_ENV === dev ? DB_HOST : PGHOST;
const port = Number(NODE_ENV === dev ? DB_PORT : PGPORT);
const username = NODE_ENV === dev ? DB_USER : PGUSER;
const password = NODE_ENV === dev ? DB_PASSWORD : PGPASSWORD;
const database = NODE_ENV === dev ? DB_NAME : PGDATABASE;
const url = NODE_ENV === prod ? `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}` : undefined;

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
