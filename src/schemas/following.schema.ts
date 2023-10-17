import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './users.schema';
import { Type } from 'class-transformer';

export type FollowingDocument = Following & Document;

@Schema({
  timestamps: true,
})
export class Following {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  @Type(() => User)
  user: User;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  @Type(() => User)
  following: User;
}

export const FollowingSchema = SchemaFactory.createForClass(Following);
