import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post('add')
  add(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createByTransaction(createUserDto);
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

  @Get('list')
  async list(@Query() { offset, limit }: { offset: number, limit: number }) {
    const keys = await this.cacheManager.store.keys();
    console.log("cache keys", keys)
    const listFromCache = await this.cacheManager.get('useList');
    if (listFromCache) {
      return listFromCache;
    }

    const list = await this.usersService.findAll({ offset, limit });
    await this.cacheManager.set('useList', list, 10000);
    return list;
  }

  @Post('addRole')
  addRole(@Body() addRoleDto: { userId: number, roleId: number }) {
    return this.usersService.addRole(addRoleDto);
  }
}
