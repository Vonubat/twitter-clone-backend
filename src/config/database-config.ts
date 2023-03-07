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

console.log(NODE_ENV);

const DATABASE_URL =
  NODE_ENV === prod
    ? `postgresql://${{ PGUSER }}:${{ PGPASSWORD }}@${{ PGHOST }}:${{ PGPORT }}/${{ PGDATABASE }}`
    : undefined;

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: NODE_ENV === dev ? DB_HOST : PGHOST,
  port: Number(NODE_ENV === dev ? DB_PORT : PGPORT),
  username: NODE_ENV === dev ? DB_USER : PGUSER,
  password: NODE_ENV === dev ? DB_PASSWORD : PGPASSWORD,
  database: NODE_ENV === dev ? DB_NAME : PGDATABASE,
  url: DATABASE_URL,
  entities: [User, Tweet, Like],
  migrations: [Migartion1677766976253],
  synchronize: false,
  logging: true,
  migrationsRun: true,
};
