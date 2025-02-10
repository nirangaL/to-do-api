import * as dotenv from 'dotenv';
dotenv.config();
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => ({
  database: {
    type: process.env.DATABASE_TYPE || 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    schema: process.env.DATABASE_SCHEMA,
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    charset: 'utf8mb4',
  },
  app: {
    version: process.env.APP_VERSION || 'v1',
    port: parseInt(process.env.APP_PORT || '3000'),
    jwtSecret: process.env.JWT_SECRET || 'ALIbaBa',
    jwtSecretExp: process.env.JWT_SECRET_EXP,
    isAppProd: process.env.IS_APP_PROD || false,
  },
});
