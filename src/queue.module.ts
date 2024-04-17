import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service.js';
import { ProducerService } from './producer.service.js';

@Module({
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService],
})
export class QueueModule {}
