import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthenticateMiddleware } from 'src/middlewares/authenticate/authenticate.middleware';
import { UserMiddleware } from 'src/middlewares/userMiddleware/user.middleware';
import { LikesController } from './controllers/likes.controller';
import { LikesService } from './services/likes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, LikeSchema } from 'src/schemas/likes.schema';
import { Post, PostSchema } from 'src/schemas/posts.schema';
import { User, UserSchema } from 'src/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticateMiddleware)
      .forRoutes('api/likes')
      .apply(UserMiddleware)
      .forRoutes('api/likes');
  }
}
