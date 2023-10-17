import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../../auth/constants';

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: any, res: any, next: () => void) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      try {
        //Verify the JWT token
        const payload = await this.jwtService.verify(token, {
          secret: jwtConstants.secret,
        });
        req['user'] = payload;
        next();
      } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
          //Handle JsonWebTokenError with "invalid signature"
          throw new HttpException(
            'Invalid token signature',
            HttpStatus.UNAUTHORIZED,
          );
        } else {
          throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
      }
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
