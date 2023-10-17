import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { SigninUserDto } from '../dtos/SigninUser.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  signUp(@Body() userDetails: CreateUserDto) {
    const users = this.authService.signUp(userDetails);
    if (!users) throw new HttpException('User found', HttpStatus.NOT_FOUND);
    return users;
  }

  @Post('signin')
  @UsePipes(new ValidationPipe())
  signIn(@Body() userDetails: SigninUserDto) {
    const users = this.authService.signIn(userDetails);
    if (!users) throw new HttpException('User found', HttpStatus.NOT_FOUND);
    return users;
  }
}
