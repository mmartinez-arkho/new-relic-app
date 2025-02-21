// src/main.ts
import 'newrelic';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NewRelicLogger } from './newrelic-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Use custom logger that sends logs to New Relic
  app.useLogger(new NewRelicLogger());
  await app.listen(3000);
  console.log(`Application is running on: http://localhost:3000`);
}
bootstrap();
