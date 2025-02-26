// src/main.ts
// This must be the first line of code
require('newrelic');

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  
  logger.log('Application starting up');
  await app.listen(3000);
  logger.log('Application listening on port 3000');
}
bootstrap().catch(err => {
  console.error('Error starting application:', err);
});
