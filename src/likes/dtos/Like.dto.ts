import { IsNotEmpty } from 'class-validator';

export class LikeDto {
  @IsNotEmpty()
  postId: string;
}
