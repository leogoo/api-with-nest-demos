import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { GrpcClientService } from './grpc-client.service';
import { CreateGrpcClientDto } from './dto/create-grpc-client.dto';
import { UpdateGrpcClientDto } from './dto/update-grpc-client.dto';

@Controller('grpc-client')
export class GrpcClientController {
  constructor(
    private readonly grpcClientService: GrpcClientService,
  ) {}

  @Post()
  create() {
    return this.grpcClientService.createSubscriber();
  }
}
