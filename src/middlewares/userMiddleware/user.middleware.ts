import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    const userPayload = req['user'];
    if (userPayload.role === 'user') {
      next();
    } else {
      throw new HttpException('User Access Denied', HttpStatus.BAD_REQUEST);
    }
  }
}
