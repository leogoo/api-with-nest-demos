import { Injectable } from '@nestjs/common';
import { CreateChapter2Dto } from './dto/create-chapter2.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Post from './entities/chapter2.entity';

@Injectable()
export class Chapter2Service {
  constructor(
    @InjectRepository(Post)
    private readonly chapter2Repository: Repository<Post>
  ) {}

  create(createChapter2Dto: CreateChapter2Dto) {
    this.chapter2Repository.save(createChapter2Dto);

    return 'This action adds a new chapter2';
  }

  findAll() {
    return `This action returns all chapter2`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chapter2`;
  }

  remove(id: number) {
    return `This action removes a #${id} chapter2`;
  }
}
