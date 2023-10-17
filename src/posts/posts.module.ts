import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthenticateMiddleware } from '../middlewares/authenticate/authenticate.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';
import { Post, PostSchema } from 'src/schemas/posts.schema';
import { UserMiddleware } from 'src/middlewares/userMiddleware/user.middleware';
import { User, UserSchema } from 'src/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticateMiddleware)
      .forRoutes('api/posts')
      .apply(UserMiddleware)
      .forRoutes('api/posts');
  }
}
