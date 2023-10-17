import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  content: string;

  image: string;
  video: string;
  audio: string;
  author: string;
}
