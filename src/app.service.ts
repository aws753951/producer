import { Injectable } from '@nestjs/common';
import { ProducerService } from './producer.service';

@Injectable()
export class AppService {
  constructor(private readonly producerService: ProducerService) {}
  async getHello() {
    await this.producerService.addToEmailQueue(123);
    return 'Hello World!';
  }
}
