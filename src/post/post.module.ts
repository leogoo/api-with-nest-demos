import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Post from './entities/post.entity';
import { PostsResolver } from './posts.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService, PostsResolver]
})
export class PostModule {}
