import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

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
