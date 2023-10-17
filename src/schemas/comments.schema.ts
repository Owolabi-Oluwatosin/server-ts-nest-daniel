import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './users.schema';
import { Type } from 'class-transformer';
import { Post } from './posts.schema';

export type CommentDocument = Comment & Document;

@Schema({
  timestamps: true,
})
export class Comment {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: Post.name })
  @Type(() => Post)
  postId: Post;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: User.name })
  @Type(() => User)
  userId: User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
