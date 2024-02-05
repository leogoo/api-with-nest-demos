import { PartialType } from '@nestjs/mapped-types';
import { CreateGrpcClientDto } from './create-grpc-client.dto';

export class UpdateGrpcClientDto extends PartialType(CreateGrpcClientDto) {}
