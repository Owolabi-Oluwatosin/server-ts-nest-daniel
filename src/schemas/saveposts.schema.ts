import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { User } from './users.schema';
import { Post } from './posts.schema';

export type SavePostDocument = SavePost & Document;

@Schema({
  timestamps: true,
})
export class SavePost {
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: User.name })
  @Type(() => User)
  author: User;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: Post.name })
  @Type(() => Post)
  post: Post;
}

export const SavePostSchema = SchemaFactory.createForClass(SavePost);
