import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';

@Injectable()
export class ProducerService {
  private channelWrapper: ChannelWrapper;
  constructor() {
    const connection = amqp.connect(['amqp://localhost:5672']);
    this.channelWrapper = connection.createChannel({
      setup: (channel: ConfirmChannel) => {
        channel.assertQueue('emailQueuex', { durable: true });
        channel.assertQueue('emailQueuex2', { durable: true });
      },
    });
    this.channelWrapper = connection.createChannel();
  }

  async addToEmailQueue(mail: any) {
    try {
      await this.channelWrapper.sendToQueue(
        'emailQueuex',
        Buffer.from(JSON.stringify(mail)),
        {
          persistent: true,
        },
      );
      Logger.log('Sent To Queue');
    } catch (error) {
      throw new HttpException(
        'Error adding mail to queue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addToEmailQueue2(mail: any) {
    try {
      await this.channelWrapper.sendToQueue(
        'emailQueuex2',
        Buffer.from(JSON.stringify(mail)),
        {
          persistent: true,
        },
      );
      Logger.log('Sent To Queue');
    } catch (error) {
      throw new HttpException(
        'Error adding mail to queue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
