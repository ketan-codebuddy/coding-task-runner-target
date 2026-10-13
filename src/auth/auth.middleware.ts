import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { timingSafeEqual } from 'node:crypto';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(request: Request, _response: Response, next: NextFunction): void {
    const expectedToken = process.env.AUTH_TOKEN;

    // Authentication is opt-in so existing local development remains unchanged.
    if (!expectedToken) {
      next();
      return;
    }

    const authorization = request.get('authorization');
    const match = authorization?.match(/^Bearer\s+(.+)$/i);
    const suppliedToken = match?.[1];

    if (!suppliedToken || !this.tokensMatch(suppliedToken, expectedToken)) {
      throw new UnauthorizedException('A valid bearer token is required');
    }

    next();
  }

  private tokensMatch(suppliedToken: string, expectedToken: string): boolean {
    const supplied = Buffer.from(suppliedToken);
    const expected = Buffer.from(expectedToken);

    return supplied.length === expected.length && timingSafeEqual(supplied, expected);
  }
}
