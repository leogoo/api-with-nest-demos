import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { SubscriberService } from './subscriber.interface';

@Injectable()
export class GrpcClientService {
  constructor(
    @Inject('GRPC_CLIENT')
    private client: ClientGrpc
  ) {}

  private subscriberService: SubscriberService;

  
  onModuleInit() {
    this.subscriberService = this.client.getService<SubscriberService>('SubscriberService');
  }

  createSubscriber() {
    return this.subscriberService.createSubscriber({
      name: 'le0',
      email: 'xxx@qq.com',
      tags: ['tag1', 'tag2'],
    });
  }

}
