// src/middleware/newrelic.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as newrelic from 'newrelic';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class NewRelicMiddleware implements NestMiddleware {
  private logger: LoggerService;

  constructor(loggerService: LoggerService) {
    this.logger = loggerService.setContext('NewRelicMiddleware');
  }

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    
    this.logger.log(`Incoming request: ${req.method} ${req.url}`);
    
    // Add response listener to log completion
    res.on('finish', () => {
      const duration = Date.now() - start;
      
      // Custom attributes to track with New Relic
      const attributes = {
        requestMethod: req.method,
        requestPath: req.path,
        responseStatus: res.statusCode,
        responseTime: duration,
      };

      newrelic.addCustomAttributes(attributes);
      
      this.logger.log(
        `Request completed: ${req.method} ${req.url} - Status: ${res.statusCode} - Duration: ${duration}ms`
      );
      
      // Record custom metric for response time
      newrelic.recordMetric(`Custom/Response/${req.method}${req.path}`, duration);
    });

    // Continue with the request
    next();
  }
}
