import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Chapter2Service } from './chapter2.service';
import { CreateChapter2Dto } from './dto/create-chapter2.dto';

@Controller('chapter2')
export class Chapter2Controller {
  constructor(private readonly chapter2Service: Chapter2Service) {}

  @Post('create')
  create(@Body() createChapter2Dto: CreateChapter2Dto) {
    return this.chapter2Service.create(createChapter2Dto);
  }

  @Get()
  findAll() {
    return this.chapter2Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chapter2Service.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chapter2Service.remove(+id);
  }
}
