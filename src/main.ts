import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Set global api end point
  app.setGlobalPrefix(`${process.env.APP_VERSION}`);

  // Set global validation pipe
  app.useGlobalPipes(new ValidationPipe());

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

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('TO-DO APIs')
    .setDescription('API documentation for TO-DO-API')
    .setVersion(`1.0.0`)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${process.env.APP_VERSION}/api/docs`, app, document);

  //Setting up port
  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
