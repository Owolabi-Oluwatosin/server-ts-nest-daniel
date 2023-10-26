import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://nest-client-daniel.vercel.app',
    methods: ['GET, HEAD, OPTION, PATCH, POST, DELETE'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
      'Authorization',
      'X-Api-Key',
    ],
    credentials: true,
    preflightContinue: false,
  });
  await app.listen(5000);
}
bootstrap();
