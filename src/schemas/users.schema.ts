import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Role {
  User = 'user',
  Admin = 'admin',
}

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ required: true, trim: true, min: 2, max: 20 })
  firstName: string;

  @Prop({ required: true, trim: true, min: 2, max: 20 })
  lastName: string;

  @Prop({ required: true, trim: true, min: 2, max: 50 })
  handle: string;

  @Prop({ required: true, trim: true, unique: true, lowercase: true })
  email: string;

  @Prop({ default: 'user' })
  role: Role;

  @Prop({ required: true, minlength: 12 })
  hash_password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
