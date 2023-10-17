import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthenticateMiddleware } from '../middlewares/authenticate/authenticate.middleware';
import { UserMiddleware } from '../middlewares/userMiddleware/user.middleware';
import { LikesController } from './controllers/likes.controller';
import { LikesService } from './services/likes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, LikeSchema } from '../schemas/likes.schema';
import { Post, PostSchema } from '../schemas/posts.schema';
import { User, UserSchema } from '../schemas/users.schema';

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
