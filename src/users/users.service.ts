import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
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
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async createAddress(createAddressDto: CreateAddressDto) {
    const newAddress = await this.addressRepository.create(createAddressDto);
    await this.addressRepository.save(newAddress);
    return newAddress;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersRepository.create(createUserDto);
      await this.usersRepository.save(newUser);
      return newUser;
    } catch (err) {
      console.log(err);
    }
  }

  async createByTransaction(createUserDto: CreateUserDto) {
    try {
      await this.entityManager.transaction(async (entityManager) => {
        // 事务操作
        await entityManager.save(User, createUserDto);
        const role = await this.entityManager.findOne(Role, {
          where: {
            id: 1
          }
        });
        await entityManager.remove(Role, role);
      })
    } catch (err) {
      console.log("createByTransaction", err);
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

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update(userId, {
      currentHashedRefreshToken
    });
  }

  // refreshToken是否一致
  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.detail(userId);
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }
}
