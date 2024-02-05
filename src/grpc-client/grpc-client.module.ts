import { Module } from '@nestjs/common';
import { GrpcClientService } from './grpc-client.service';
import { GrpcClientController } from './grpc-client.controller';
import { Transport, ClientProxyFactory } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  controllers: [GrpcClientController],
  providers: [
    GrpcClientService,
    {
      provide: 'GRPC_CLIENT',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: 'subscribers',
            protoPath: join(__dirname, 'proto/subscribers.proto')
          }
        })
      }
    },
  ]
})
export class GrpcClientModule {}
