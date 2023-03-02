import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { databaseConfig } from './database-config';

export const typeOrmConfig: TypeOrmModuleOptions = databaseConfig;

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return databaseConfig;
  },
};
