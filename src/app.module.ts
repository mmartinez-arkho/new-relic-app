// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ValidateController } from './validate.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, ValidateController],
  providers: [AppService],
})
export class AppModule {}
