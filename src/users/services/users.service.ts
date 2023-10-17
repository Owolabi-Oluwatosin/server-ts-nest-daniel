import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UpdateUserDto } from '../dtos/UpdateUser.dto';
import { User } from '../../schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().select('-hash_password').exec();
    if (!users) throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    return users;
  }

  async getUserById(id: string) {
    if (mongoose.isValidObjectId(id)) {
      const user = await this.userModel
        .findById({ _id: id })
        .select('-hash_password');
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      return user;
    } else {
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    if (mongoose.isValidObjectId(id)) {
      const user = await this.userModel.findById({ _id: id });
      if (user) {
        await this.userModel
          .findByIdAndUpdate(id, updateUserDto, { new: true })
          .exec();
        return { message: 'Post updated successfully' };
      } else {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(id: string) {
    if (mongoose.isValidObjectId(id)) {
      const user = await this.userModel.findById({ _id: id });
      if (user) {
        await this.userModel.findByIdAndDelete({ _id: id });
        return { message: 'User deleted successfully' };
      } else {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }
  }
}
