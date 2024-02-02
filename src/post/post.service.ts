import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Post from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}
  
  async create(createPostDto: CreatePostDto, user: User) {
    const post = this.postRepository.create({
      ...createPostDto,
      author: user,
    });
    await this.postRepository.save(post);
    return post;
  }

  findAll() {
    return this.postRepository.find({ relations: ['author'] });
  }

  findByTitle(title: string): Promise<Post | null>  {
    return this.postRepository.findOne({ 
      where: {
        title
      }
    });
  }
}
