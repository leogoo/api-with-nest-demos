import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async register(createUserDto: CreateUserDto) {
    const { password } = createUserDto || {};
    const pwHashed = await bcrypt.hash(password, 10);
    try {
      const newUser = await this.create({
        ...createUserDto,
        password: pwHashed,
      });
      newUser.password = undefined;
      return newUser;
    } catch (error) {
    }
  }

  findOne(email: string) {
    return this.usersRepository.findOne({ 
      where: {
        email
      }
    });
  }
}
