import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.enableCors({
  //   origin: 'http://localhost:3000',
  //   methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  //   preflightContinue: false,
  //   credentials: true,
  //   allowedHeaders: ['Content-Type, Accept'],
  // });
  // app.use(function (request: Request, response: Response, next: NextFunction) {
  //   response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  //   next();
  // });
  await app.listen(5000);
}
bootstrap();
