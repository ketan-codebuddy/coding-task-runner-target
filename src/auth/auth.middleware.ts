import {
  Injectable,
  NestMiddleware,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction): void {
    const expectedToken = process.env.AUTH_TOKEN;

    if (!expectedToken) {
      throw new ServiceUnavailableException('Authentication is not configured');
    }

    const authorization = req.header('authorization');
    const match = authorization?.match(/^Bearer\s+(.+)$/i);

    if (!match || match[1] !== expectedToken) {
      throw new UnauthorizedException('A valid Bearer token is required');
    }

    next();
  }
}
