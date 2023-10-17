import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { LikesModule } from './likes/likes.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.USER_NAME}:${process.env.DB_PASSWORD}@cluster0.1bhjq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    ),
    AuthModule,
    UsersModule,
    PostsModule,
    LikesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
