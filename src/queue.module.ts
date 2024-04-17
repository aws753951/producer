import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service.js';

@Module({
  providers: [ProducerService],
  exports: [ProducerService],
})
export class QueueModule {}
