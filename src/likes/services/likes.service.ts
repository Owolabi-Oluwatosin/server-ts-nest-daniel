import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Like } from '../../schemas/likes.schema';
import { User } from '../../schemas/users.schema';
import { Post } from '../../schemas/posts.schema';
import { LikeType, UserPayload } from '../../utils/types';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name) private likeModel: mongoose.Model<Like>,
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
    @InjectModel(Post.name) private postModel: mongoose.Model<Post>,
  ) {}

  async likePost(likeBody: LikeType, userPayload: UserPayload) {
    const { postId } = likeBody;
    const { id, role } = userPayload;
    if (role === 'user') {
      const post = await this.postModel.findById({ _id: postId }).exec();
      const user = await this.userModel.findById({ _id: id }).exec();
      if (user && post) {
        const createdLike = new this.likeModel({
          postLikeOn: postId,
          likeBy: id,
        });
        const like = createdLike.save();
        if (!like)
          throw new HttpException(
            'Failed to create like',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        return like;
      } else {
        throw new HttpException(
          'User or Post to like not found',
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      throw new HttpException(
        'Failed to create a like',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async findAll(): Promise<Like[]> {
    const likes = await this.likeModel.find();
    if (!likes) throw new HttpException('No likes found', HttpStatus.NOT_FOUND);
    return likes;
  }

  async findUserLikeById(id: string) {
    const likes = await this.likeModel.find({ postLikeOn: id }).exec();
    if (!likes) throw new HttpException('No like found', HttpStatus.NOT_FOUND);
    return likes;
  }
}
