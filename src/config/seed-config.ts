import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { MainSeeder } from '../db/seeding/main.seeder';
import { databaseConfig } from './database-config';

const options: DataSourceOptions & SeederOptions = {
  ...databaseConfig,
  seeds: [MainSeeder],
};

const SeedDataSource = new DataSource(options);

SeedDataSource.initialize().then(async () => {
  await SeedDataSource.synchronize(true);
  await runSeeders(SeedDataSource);
  process.exit();
});
