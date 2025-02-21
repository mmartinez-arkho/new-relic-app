// src/newrelic-logger.service.ts
import { ConsoleLogger } from '@nestjs/common';
import * as newrelic from 'newrelic';

export class NewRelicLogger extends ConsoleLogger {
  log(message: any, context?: string) {
    super.log(message, context);
    newrelic.recordCustomEvent('Log', {
      level: 'log',
      message,
      context: context || 'Application',
    });
  }

  error(message: any, trace?: string, context?: string) {
    super.error(message, trace, context);
    newrelic.noticeError(new Error(message));
  }

  warn(message: any, context?: string) {
    super.warn(message, context);
    newrelic.recordCustomEvent('Log', {
      level: 'warn',
      message,
      context: context || 'Application',
    });
  }

  debug(message: any, context?: string) {
    super.debug(message, context);
    newrelic.recordCustomEvent('Log', {
      level: 'debug',
      message,
      context: context || 'Application',
    });
  }

  verbose(message: any, context?: string) {
    super.verbose(message, context);
    newrelic.recordCustomEvent('Log', {
      level: 'info',
      message,
      context: context || 'Application',
    });
  }
}
