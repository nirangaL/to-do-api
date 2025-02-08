import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const typeormConfig: DataSourceOptions = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  type: (process.env.DATABASE_TYPE as any) || 'postgres',
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_SCHEMA,
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
  logging: !process.env.IS_APP_PROD,
};
