import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [
    MongooseModule.forRoot(''),
    AuthModule,
    UsersModule,
    PostsModule,
    LikesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
