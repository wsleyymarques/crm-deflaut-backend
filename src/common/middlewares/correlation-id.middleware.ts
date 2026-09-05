import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const correlationId = request.headers['x-correlation-id'] || randomUUID();
    request['correlationId'] = correlationId;
    response.setHeader('X-Correlation-ID', correlationId);
    next();
  }
}
