import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(
  //   cors({
  //     origin: 'https://nest-client-daniel.vercel.app/',
  //     credentials: true,
  //   }),
  // );
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
    ],
    credentials: true,
    preflightContinue: true,
  });
  // app.use(function (request: Request, response: Response, next: NextFunction) {
  //   response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  //   next();
  // });
  await app.listen(5000);
}
bootstrap();
