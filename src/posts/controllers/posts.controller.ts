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
  Put,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dtos/CreatePost.dto';
import { UpdatePostDto } from '../dtos/UpdatePost.dto';

@Controller('api/posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  // @Get()
  // getAllUsers() {
  //   return this.userService.fetchUsers();
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

  // @Get('/comments')
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

  @Post('create')
  @UsePipes(new ValidationPipe())
  createPost(@Body() postBody: CreatePostDto, @Req() req: Request) {
    const userPayload = req['user'];
    const post = this.postService.createPost(postBody, userPayload);
    if (!post) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return post;
  }

  @Get()
  findAll() {
    const post = this.postService.findAll();
    if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    return post;
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    const post = this.postService.getPostById(id);
    if (!post) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return post;
  }

  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }

  // @Get()
  // getAllPosts() {
  //   return this.postService.findAll();
  // }

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
