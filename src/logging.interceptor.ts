// src/logging.interceptor.ts
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  import { NewRelicLogger } from './newrelic-logger.service';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new NewRelicLogger(LoggingInterceptor.name);
  
    intercept(
      context: ExecutionContext,
      next: CallHandler
    ): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const { method, url } = request;
      const now = Date.now();
  
      return next.handle().pipe(
        tap(() =>
          this.logger.log(
            `${method} ${url} - ${Date.now() - now}ms`
          )
        )
      );
    }
  }
  