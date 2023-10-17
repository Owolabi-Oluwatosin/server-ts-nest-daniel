import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UpdateUserDto } from '../dtos/UpdateUser.dto';
import { UsersService } from '../services/users.service';

@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // @Get()
  // getAllUsers() {
  //   return this.userService.fetchUsers();
  // }

  // @Get('details')
  // getUsers() {
  //   return [{ username: 'Daniel', email: 'daniel@gmail.com' }];
  // }

  // @Get('posts')
  // getUserPosts() {
  //   return [
  //     {
  //       username: 'Daniel',
  //       email: 'daniel@gmail.com',
  //       posts: [
  //         { id: 1, title: 'title', content: 'content' },
  //         { id: 2, title: 'title2', content: 'content2' },
  //       ],
  //     },
  //   ];
  // }

  // @Get('posts/comments')
  // getUserPostComments() {
  //   return [
  //     {
  //       posts: { id: 1, title: 'post title', comment: [] },
  //     },
  //   ];
  // }

  //Express way of getting request
  // @Post('create')
  // createUser(@Req() req: Request, @Res() res: Response) {
  //   console.log(req.body);
  //   res.send(req.body);
  // }

  //Express way of getting request
  // @Get()
  // getUserById2(@Req() req: Request, @Res() res: Response) {
  //   console.log(req.params);
  //   res.send(req.params);
  // }

  //NestJS way of getting request
  // @Get(':id/:postId')
  // getUserById(@Param('id') id: string, @Param('postId') postId: string) {
  //   console.log(id, postId);
  //   return { id: id, postId: postId };
  // }

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    const user = this.userService.getUserById(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  //Other types of Pipes that can be used:
  // ParseEnumPipe
  // ParseFilePipe
  // ParseFilePipeBuilder
  // ParseFloatPipe
  // ParseUUIDPipe
  // ParseArrayPipe

  //I can also pass ParseBoolPipe if I am expecting true or false value
  // @Get('sort')
  // @HttpCode(200)
  // @Header('Cache-Control', 'none')
  // getUserByQuery(@Query('sortBy') sortBy: string) {
  //   console.log(sortBy);
  //   return { sortBy };
  // }
}
