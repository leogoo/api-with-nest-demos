import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Get('delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }

  @Get('removeAll')
  removeAll() {
    return this.usersService.removeAll();
  }

  @Get('detail/:id')
  detail(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.detail(id);
  }

  @Get('List')
  list() {
    return this.usersService.findAll();
  }
}
