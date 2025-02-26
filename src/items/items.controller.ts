// src/items/items.controller.ts
import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Param, 
    HttpException, 
    HttpStatus 
  } from '@nestjs/common';
  import { LoggerService } from '../logger/logger.service';
  import * as newrelic from 'newrelic';
  
  interface Item {
    id: number;
    name: string;
    description: string;
  }
  
  @Controller('items')
  export class ItemsController {
    private items: Item[] = [];
    private logger: LoggerService;
  
    constructor(loggerService: LoggerService) {
      this.logger = loggerService.setContext('ItemsController');
    }
  
    @Get()
    getAllItems() {
      this.logger.log('Fetching all items');
      
      // Correctly use startSegment with a handler function
      return newrelic.startSegment('getAllItems', true, () => {
        // Simulate some processing
        this.simulateProcessing(50);
        
        return {
          success: true,
          data: this.items,
          count: this.items.length,
        };
      });
    }

  @Get(':id')
  getItemById(@Param('id') id: string) {
    this.logger.log(`Fetching item with id: ${id}`);

    // Custom transaction naming
    newrelic.setTransactionName('getItemById');

    const itemId = parseInt(id, 10);
    const item = this.items.find((item) => item.id === itemId);

    if (!item) {
      this.logger.error(`Item with id ${id} not found`);
      throw new HttpException(
        `Item with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.logger.log(`Successfully retrieved item: ${item.name}`);
    return {
      success: true,
      data: item,
    };
  }

  @Post()
  createItem(@Body() itemData: Omit<Item, 'id'>) {
    this.logger.log('Creating new item', JSON.stringify(itemData));

    // Start a custom New Relic transaction
    newrelic.startWebTransaction('createItem', () => {
      try {
        // Validate input
        if (!itemData.name || !itemData.description) {
          this.logger.error('Invalid item data: Missing required fields');
          throw new HttpException(
            'Name and description are required',
            HttpStatus.BAD_REQUEST,
          );
        }

        // Simulate some processing
        this.simulateProcessing(100);

        // Create new item with incremental ID
        const newItem: Item = {
          id: this.items.length + 1,
          ...itemData,
        };

        this.items.push(newItem);

        this.logger.log(`Item created successfully with id: ${newItem.id}`);

        return {
          success: true,
          data: newItem,
        };
      } catch (error) {
        this.logger.error('Error creating item', error.stack);
        throw error;
      }
    });
  }

  @Get('test/error')
  generateError() {
    this.logger.log('Intentionally generating an error for testing');

    newrelic.addCustomAttribute('testType', 'error_test');

    try {
      throw new Error('This is a test error for New Relic monitoring');
    } catch (error) {
      this.logger.error('Test error generated', error.stack);

      // Notice error in New Relic
      newrelic.noticeError(error, {
        errorType: 'TestError',
        component: 'ItemsController',
      });

      throw new HttpException(
        'Test error generated',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private simulateProcessing(ms: number) {
    const start = Date.now();
    while (Date.now() - start < ms) {
      // Simulate CPU-bound work
    }
  }
}
