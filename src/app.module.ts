// src/app.module.ts
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewRelicMiddleware } from './middleware/newrelic.middleware';
import { ItemsController } from './items/items.controller';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [LoggerModule],
  controllers: [AppController, ItemsController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(NewRelicMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
