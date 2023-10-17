import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UpdatePostDto } from '../dtos/UpdatePost.dto';
import { Post, PostDocument } from '../../schemas/posts.schema';
import { CreatePostType, UserPayload } from '../../utils/types';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: mongoose.Model<PostDocument>,
  ) {}

  async createPost(postDetails: CreatePostType, userPayload: UserPayload) {
    const { content, image, video, audio } = postDetails;
    const { id, role } = userPayload;
    if (role === 'user') {
      const createdPost = new this.postModel({
        content,
        author: id,
      });
      if (image) {
        createdPost.image = image;
      } else if (video) {
        createdPost.video = video;
      } else if (audio) {
        createdPost.audio = audio;
      }
      const post = createdPost.save();
      if (!post)
        throw new HttpException(
          'Failed to create post',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      return post;
    } else {
      throw new HttpException(
        'Failed to create a post',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.postModel
      .find()
      .populate('author', '_id firstName lastName email role createdAt');
    if (!posts) throw new HttpException('No post found', HttpStatus.NOT_FOUND);
    return posts;
  }

  async getPostById(id: string) {
    if (mongoose.isValidObjectId(id)) {
      const post = await this.postModel.findById({ _id: id }).exec();
      if (!post)
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      return post;
    } else {
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    if (mongoose.isValidObjectId(id)) {
      const post = await this.postModel.findById({ _id: id });
      if (post) {
        await this.postModel
          .findByIdAndUpdate(id, updatePostDto, { new: true })
          .exec();
        return { message: 'Post updated successfully' };
      } else {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }
  }

  async deletePost(id: string) {
    if (mongoose.isValidObjectId(id)) {
      const post = await this.postModel.findById({ _id: id });
      if (post) {
        await this.postModel.findByIdAndDelete({ _id: id });
        return { message: 'Post deleted successfully' };
      } else {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }
  }
}
