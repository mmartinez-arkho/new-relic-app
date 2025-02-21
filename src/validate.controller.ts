// src/validate.controller.ts
import {
    Controller,
    Get,
    Query,
    BadRequestException,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { ValidateNumberDto } from './dto/validate-number.dto';
  import { NewRelicLogger } from './newrelic-logger.service';
  
  @Controller('validate')
  export class ValidateController {
    private logger = new NewRelicLogger(ValidateController.name);
  
    @Get()
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    validate(@Query() query: ValidateNumberDto) {
      const numValue = query.value;
      this.logger.debug(`Received value: ${numValue}`, 'ValidateController');
  
      // Validation Test 1: Check (even) pair number.
      if (numValue % 2 !== 0) {
        this.logger.warn(
          `Value ${numValue} is not an even number!`,
          'ValidateController'
        );
        throw new BadRequestException(
          'Value is not even (it must be an even number).'
        );
      }
  
      // Validation Test 2: Check if number is within a specific range (e.g., 2 to 100).
      if (numValue < 2 || numValue > 100) {
        this.logger.verbose(
          `Value ${numValue} is out of the allowed range (2-100).`,
          'ValidateController'
        );
        throw new BadRequestException(
          'Value is out of allowed range (2-100).'
        );
      }
  
      // All validations passed.
      this.logger.log(
        `Validated even number within range: ${numValue}`,
        'ValidateController'
      );
      return { message: 'Validation successful', value: numValue };
    }
  }
  