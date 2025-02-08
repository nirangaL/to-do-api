import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Set global api end point
  app.setGlobalPrefix(`${process.env.APP_VERSION}`);

  await app.listen(process.env.APP_PORT ?? 3000);

  app.enableCors();

  // Security Headers with Helmet
  app.use(helmet());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
      },
    }),
  );
  app.use(
    helmet.permittedCrossDomainPolicies({
      permittedPolicies: 'none',
    }),
  );

  // Rate Limiting
  app.use(
    rateLimit({
      windowMs: 2 * 60 * 1000, // 2 minutes
      max: 500, // limit each IP to 500 requests per windowMs
    }),
  );
}
bootstrap();
