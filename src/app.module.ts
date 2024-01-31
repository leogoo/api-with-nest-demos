import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import Post from './post/entities/post.entity';
import { User } from './users/entities/user.entity';
import Address from './users/entities/address.entity';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guard';
import { PostModule } from './post/post.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // 数据库类型
      host: 'localhost', // 数据库主机
      port: 5432, // 数据库端口
      username: 'myuser', // 数据库用户名
      password: 'mysecretpassword', // 数据库密码
      database: 'mydatabase', // 数据库名称
      entities: [Post, User, Address], // 实体类数组
      synchronize: true, // 自动创建表结构（仅用于开发环境）
    }),
    TypeOrmModule.forFeature([Post, User, Address]),
    UsersModule,
    AuthModule,
    PostModule,
    RoleModule, // 导入实体类
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'USER_AUTH',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
