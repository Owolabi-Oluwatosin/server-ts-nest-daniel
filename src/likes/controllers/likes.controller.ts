import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LikesService } from '../services/likes.service';
import { Request, Response } from 'express';
import { LikeDto } from '../dtos/Like.dto';

@Controller('api/likes')
export class LikesController {
  constructor(private likeService: LikesService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  likePost(@Body() likeBody: LikeDto, @Req() req: Request) {
    const userPayload = req['user'];
    const like = this.likeService.likePost(likeBody, userPayload);
    if (!like)
      throw new HttpException('Failed to create like', HttpStatus.NOT_FOUND);
    return like;
  }

  @Get()
  findAll() {
    const likes = this.likeService.findAll();
    if (!likes) throw new HttpException('No likes found', HttpStatus.NOT_FOUND);
    return likes;
  }

  @Get(':id')
  findUserLikeById(@Param('id') id: string) {
    const like = this.likeService.findUserLikeById(id);
    if (!like) throw new HttpException('No like found', HttpStatus.NOT_FOUND);
    return like;
  }
}
