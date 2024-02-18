import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import Post from './post/entities/post.entity';
import { User } from './users/entities/user.entity';
import Address from './users/entities/address.entity';
import { Role } from './role/entities/role.entity';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guard';
import { PostModule } from './post/post.module';
import { RoleModule } from './role/role.module';
import { GrpcClientModule } from './grpc-client/grpc-client.module';
import * as Joi from '@hapi/joi';
import { CacheModule, CacheInterceptor, CacheStore } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';
import { CronModule } from './cron/cron.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ChatGateway } from './chat/chat.gateway';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // playground: false,
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      autoSchemaFile: true,
      sortSchema: true,
    }),
    ScheduleModule.forRoot(),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
          },
        })
        return {
          store: store as unknown as CacheStore,
        }
      },
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      })
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // 数据库类型
      host: 'localhost', // 数据库主机
      port: 5432, // 数据库端口
      username: 'myuser', // 数据库用户名
      password: 'mysecretpassword', // 数据库密码
      database: 'mydatabase', // 数据库名称
      entities: [Post, User, Address, Role], // 实体类数组
      synchronize: true, // 自动创建表结构（仅用于开发环境）
    }),
    TypeOrmModule.forFeature([Post, User, Address, Role]),
    UsersModule,
    AuthModule,
    PostModule,
    RoleModule,
    GrpcClientModule,
    CronModule,
  ],
  controllers: [AppController],
  providers: [
    ChatGateway,
    AppService,
    {
      provide: 'USER_AUTH',
      useClass: AuthGuard,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class AppModule {}
