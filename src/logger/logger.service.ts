// src/logger/logger.service.ts
import { Injectable, LoggerService as NestLoggerService, Scope } from '@nestjs/common';
import * as newrelic from 'newrelic';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements NestLoggerService {
  private context?: string;

  constructor() {
    this.context = undefined;
  }

  setContext(context: string) {
    this.context = context;
    return this;
  }

  log(message: any, context?: string): void {
    const contextToUse = context || this.context;
    const messageWithContext = contextToUse ? `[${contextToUse}] ${message}` : message;
    
    console.log(messageWithContext);
    
    // Send log to New Relic
    newrelic.recordLogEvent({
      message: messageWithContext,
      level: 'info',
      timestamp: Date.now(),
    });
  }

  error(message: any, trace?: string, context?: string): void {
    const contextToUse = context || this.context;
    const messageWithContext = contextToUse ? `[${contextToUse}] ${message}` : message;
    
    console.error(messageWithContext, trace);
    
    // Send error to New Relic
    newrelic.recordLogEvent({
      message: messageWithContext,
      level: 'error',
      timestamp: Date.now(),
      // Fix the error object format
      error: message instanceof Error 
        ? message 
        : new Error(typeof message === 'string' ? message : JSON.stringify(message)),
    });
    
    // Also record as error in New Relic
    if (message instanceof Error) {
      newrelic.noticeError(message);
    } else {
      newrelic.noticeError(new Error(messageWithContext));
    }
  }

  warn(message: any, context?: string): void {
    const contextToUse = context || this.context;
    const messageWithContext = contextToUse ? `[${contextToUse}] ${message}` : message;
    
    console.warn(messageWithContext);
    
    // Send warning to New Relic
    newrelic.recordLogEvent({
      message: messageWithContext,
      level: 'warn',
      timestamp: Date.now(),
    });
  }

  debug(message: any, context?: string): void {
    const contextToUse = context || this.context;
    const messageWithContext = contextToUse ? `[${contextToUse}] ${message}` : message;
    
    console.debug(messageWithContext);
    
    // Send debug log to New Relic
    newrelic.recordLogEvent({
      message: messageWithContext,
      level: 'debug',
      timestamp: Date.now(),
    });
  }

  verbose(message: any, context?: string): void {
    const contextToUse = context || this.context;
    const messageWithContext = contextToUse ? `[${contextToUse}] ${message}` : message;
    
    console.log(messageWithContext);
    
    // Send verbose log to New Relic
    newrelic.recordLogEvent({
      message: messageWithContext,
      level: 'verbose',
      timestamp: Date.now(),
    });
  }
}
