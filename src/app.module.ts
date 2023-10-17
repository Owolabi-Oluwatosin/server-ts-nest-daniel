import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://Odevtools007:QNQczaC83JTeI39a@cluster0.1bhjq.mongodb.net/nestDB?retryWrites=true&w=majority`,
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
