import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { User } from './users.schema';
import { Post } from './posts.schema';

export type LikeDocument = Like & Document;

@Schema({
  timestamps: true,
})
export class Like {
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: User.name })
  @Type(() => User)
  likeBy: User;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: Post.name })
  @Type(() => Post)
  postLikeOn: Post;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
