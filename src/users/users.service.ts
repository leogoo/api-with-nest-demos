import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import Address from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createAddress(createAddressDto: CreateAddressDto) {
    const newAddress = await this.addressRepository.create(createAddressDto);
    await this.addressRepository.save(newAddress);
    return newAddress;
  }

  async create(createUserDto: CreateUserDto & { address: any }) {
    try {
      const newUser = await this.usersRepository.create(createUserDto);
      await this.usersRepository.save(newUser);
      return newUser;
    } catch (err) {
      console.log(err);
    }
  }
  
  async register(createUserDto: CreateUserDto) {
    const { password, ...user } = createUserDto;
    const pwHashed = await bcrypt.hash(password, 10);
    try {
      const newUser = await this.create({
        ...user,
        password: pwHashed,
      });
      newUser.password = undefined;
      return newUser;
    } catch (error) {
    }
  }

  delete(id: number) {
    return this.usersRepository.delete(id);
  }

  findOne(email: string) {
    return this.usersRepository.findOne({ 
      where: {
        email
      }
    });
  }
  async detail(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id
      },
      relations: ['address', 'posts']
    });
    return user;
  }

  findAll() {
    return this.usersRepository.find({ relations: ['address', 'posts'] });
  }

  removeAll() {
    return this.usersRepository.delete({});
  }

  async addRole(addRoleDto: { userId: number, roleId: number }) {
    const { userId, roleId, } = addRoleDto || {};
    const user = await this.usersRepository.findOne({
      where: {
        id: +userId
      },
      // 需要指定relations，否则user不会带上roles属性
      relations: ['roles']
    });
    const role = await this.roleRepository.findOne({
      where: {
        id: +roleId
      }
    });
    const newUser = await this.usersRepository.save({
      ...user,
      roles: [...user?.roles, role]
    });
    return newUser;
  }
}
