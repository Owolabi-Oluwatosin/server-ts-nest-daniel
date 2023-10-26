import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../schemas/users.schema';
import { CreateUserType, SigninUserType } from '../../utils/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async generateUniqueHandle(
    firstName: string,
    lastName: string,
  ): Promise<string> {
    const baseHandle = `@${firstName}${lastName}`.toLowerCase();
    let uniqueHandle = baseHandle;
    let counter = 1;

    while (true) {
      const existingUser = await this.userModel.findOne({
        handle: uniqueHandle,
      });
      if (!existingUser) {
        return uniqueHandle;
      }

      //If the handle already exists, add a counter as a suffix and try again.
      counter++;
      uniqueHandle = `${baseHandle}${counter}`;
    }
  }

  async signUp(userDetails: CreateUserType) {
    const { firstName, lastName, email, password } = userDetails;
    const user = await this.userModel.findOne({ email: email });
    if (user)
      throw new HttpException(
        'User with this email already exist',
        HttpStatus.FOUND,
      );
    const handle = await this.generateUniqueHandle(firstName, lastName);
    const hash_password = await bcrypt.hash(password, 12);
    const createdUser = new this.userModel({
      firstName,
      lastName,
      handle,
      email,
      hash_password,
    });
    const _user = createdUser.save();
    if (!_user)
      throw new HttpException(
        'Failed to create user',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return { message: 'Account created successfully' };
  }

  async signIn(userDetails: SigninUserType): Promise<any> {
    const { email, password } = userDetails;
    const _user = await this.userModel.findOne({ email: email });
    if (!_user) throw new HttpException('User not found', HttpStatus.FOUND);
    const isMatch = await bcrypt.compare(password, _user.hash_password);
    if (!isMatch)
      throw new HttpException(
        'Invalid email and password',
        HttpStatus.UNAUTHORIZED,
      );
    if (isMatch) {
      const payload = {
        id: _user._id,
        role: _user.role,
      };
      const access_token = await this.jwtService.signAsync(payload);
      const user = {
        _id: _user._id,
        firstName: _user.firstName,
        lastName: _user.lastName,
        handle: _user.handle,
        email: _user.email,
        role: _user.role,
      };
      const userDetails = {
        user,
        access_token,
      };
      return userDetails;
    }
  }
}
