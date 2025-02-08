import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import configuration from './configuration';
dotenv.config();

export const typeormConfig: DataSourceOptions = {
  type: configuration().database.type as any,
  port: configuration().database.port,
  username: configuration().database.user,
  password: configuration().database.password,
  database: configuration().database.schema,
  charset: 'utf8mb4',
  entities: [`dist/**/*.entity{.ts,.js}`],
  migrations: [`dist/migrations/*{.ts,.js}`],
  extra: {
    charset: 'utf8mb4',
    connectionLimit: 10,
    connectTimeout: 30000, // 30 seconds
    acquireTimeout: 30000, // 30 seconds
  },
  synchronize: false,
  legacySpatialSupport: false,
  logging: !configuration().app.isAppProd,
};
